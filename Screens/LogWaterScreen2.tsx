import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { useEffect, useRef, useState } from 'react';
import { Button, Platform, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

export default function App() {
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState<Notifications.Notification | undefined>(
        undefined
    );
    const [water, setWater] = useState<number>(0);
    const notificationListener = useRef<Notifications.Subscription>();
    const responseListener = useRef<Notifications.Subscription>();

    const addGlass = async () => {
        try {
            const newWaterValue = water + 1;
            await storeWaterData('water', newWaterValue);
            // setWater(newWaterValue);
        } catch (e) {
            console.log("An error occurred: ", e);
        }
    };

    const storeWaterData = async (key: string, value: Number) => {
        try {
            await AsyncStorage.setItem(key, value.toString());
            setWater(Number(value));
        } catch (e) {
            console.error("Failed to save data:", e);
        }
    };

    const loadWaterData = async () => {
        try {
            const storedWater = await AsyncStorage.getItem('water');
            if (storedWater !== null) {
                await setWater(Number(storedWater));
            }
        } catch (e) {
            console.error("Error fetching data:", e);
        }
    };

    useEffect(() => {
        loadWaterData();
        registerForPushNotificationsAsync().then(token => token && setExpoPushToken(token));

        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
        });

        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log(response);
        });

        return () => {
            notificationListener.current &&
                Notifications.removeNotificationSubscription(notificationListener.current);
            responseListener.current &&
                Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, []);

    return (
        <ScrollView contentContainerStyle={{ flex: 1, justifyContent: 'space-between' }}>
            <View style={styles.container}>
                <Text style={styles.title}>Today's Water Intake</Text>
                <TextInput
                    style={styles.input}
                    value={water.toString()}
                    editable={false}
                    keyboardType="numeric"
                />
                <Button title="Add a glass" onPress={addGlass} />
                <Text style={{ marginTop: 7 }}>You have drunk {water} glasses of water today.</Text>
            </View>

            <View style={{ alignItems: 'flex-start', justifyContent: 'center', margin: 12 }}>
                <Text>Title: {notification && notification.request.content.title} </Text>
                <Text>Body: {notification && notification.request.content.body}</Text>
            </View>
            <View style={{ marginBottom: 40 }}>
                <Button
                    title="Press to schedule a notification"
                    onPress={async () => {
                        await schedulePushNotification();
                    }}
                />
            </View>
        </ScrollView>
    );
}

async function schedulePushNotification() {

    const water = await AsyncStorage.getItem('water');
    if (water !== null && Number(water) < 5) {
        await Notifications.scheduleNotificationAsync({
            content: {
                title: "You've got mail! 📬",
                body: "You haven't drunk 5 glasses of water today.Stay hydrated! 🥛",
                data: { data: 'goes here', test: { test1: 'more data' } },
            },
            trigger: { seconds: 2 },
        });
    } else {
        await Notifications.scheduleNotificationAsync({
            content: {
                title: "You've got mail! 📬",
                body: "You have drunk eought glasses of water today. Good job! 😉👍",
                data: { data: 'goes here', test: { test1: 'more data' } },
            },
            trigger: { seconds: 2 },
        });
    }
}

async function registerForPushNotificationsAsync() {
    let token;

    if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }

    if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
        }
        // Learn more about projectId:
        // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
        // EAS projectId is used here.
        try {
            const projectId =
                Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
            if (!projectId) {
                throw new Error('Project ID not found');
            }
            token = (
                await Notifications.getExpoPushTokenAsync({
                    projectId,
                })
            ).data;
            console.log(token);
        } catch (e) {
            token = `${e}`;
        }
    } else {
        alert('Must use physical device for Push Notifications');
    }

    return token;
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: 'black',
        padding: 10,
        width: 100,
        textAlign: 'center',
        marginBottom: 20,
    },
});
