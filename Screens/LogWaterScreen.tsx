import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

export default function WaterIntake() {
    const [water, setWater] = useState<number>(0);

    const addGlass = async () => {
        try {
            const newWaterValue = water + 1;
            await storeData('water', newWaterValue);
            setWater(newWaterValue);
        } catch (e) {
            console.log("An error occurred: ", e);
        }
    };

    const storeData = async (key: string, value: Number) => {
        try {
            await AsyncStorage.setItem(key, value.toString());
            // await setWater(Number(value));
        } catch (e) {
            console.error("Failed to save data:", e);
        }
    };

    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem('water');
            if (value !== null) {
                setWater(Number(value));
                // console.log("setWater(Number(value)); ", water);
            }
        } catch (e) {
            console.error("Error fetching data:", e);
        }
    };

    const resetStorage = async () => {
        try {
            const now = new Date();
            if (now.getHours() === 23 && now.getMinutes() === 59) {
                await AsyncStorage.removeItem('water');
                // setWater(0);
            }
        } catch (error) {
            console.error("Failed to reset data:", error);
        }
    };

    const schedulePushNotification = async () => {
        const now = new Date();
        const nextNotification = new Date();
        nextNotification.setHours(18, 0, 0, 0);

        if (now > nextNotification) {
            nextNotification.setDate(nextNotification.getDate() + 1);
        }
        const delay = nextNotification.getTime() - now.getTime();

        if (water < 5) {
            // console.log("Water: ", water);
            await Notifications.scheduleNotificationAsync({
                content: {
                    title: "You've got a message! 📬",
                    body: "You haven't drunk 5 glasses of water today. Stay hydrated!",
                },
                trigger: { hour: delay / 10000, repeats: true },
            });
        }
    };

    const registerForPushNotificationsAsync = async () => {
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
    };

    useEffect(() => {
        const registerAndSchedule = async () => {
            await registerForPushNotificationsAsync();
            Notifications.setNotificationHandler({
                handleNotification: async () => ({
                    shouldShowAlert: true,
                    shouldPlaySound: true,
                    shouldSetBadge: true,
                }),
            });
            await schedulePushNotification();
        };
        resetStorage();
        registerAndSchedule();
    }, []);

    useEffect(() => {
        console.log("Water:", water);
    }, [water]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Today's Water Intake</Text>
            <TextInput
                style={styles.input}
                value={water.toString()}
                editable={false}
                keyboardType="numeric"
            />
            <Button title="Add a glass" onPress={addGlass} />
            <Text style={{ color: 'white', marginTop: 7 }}>You have drunk {water} glasses of water today.</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        color: 'white',
    },
    input: {
        borderWidth: 1,
        borderColor: 'white',
        padding: 10,
        width: 100,
        textAlign: 'center',
        marginBottom: 20,
        color: 'white',
    },
});
