import React from 'react';
import { Button, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack/types';
import { user } from '../data';
import LocationExpo from '../lib/Location';
import { RootStackParamList } from '../navigators/RootStackNavigator';

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export default function HomeScreen({ navigation }: Props) {
    return (
        <ScrollView style={styles.container}>
            <View style={styles.infoContainer}>
                <Text style={styles.headline}>Personal Information</Text>
                <Text style={styles.label}>Fullname:</Text>
                <Text style={styles.value}>{user.fullname}</Text>
                <Text style={styles.label}>Age:</Text>
                <Text style={styles.value}>{user.age}</Text>
                <Text style={styles.label}>Weight:</Text>
                <Text style={styles.value}>{user.weight} cm</Text>
                <Text style={styles.label}>Height:</Text>
                <Text style={styles.value}>{user.height} cm</Text>
            </View>
            <View style={styles.infoContainer2}>
                <Image
                    style={styles.image}
                    source={require('../selfies/OIP.jpg')}
                />
            </View>
            <View style={styles.infoContainer}>
                < LocationExpo />
            </View>
            <View style={styles.infoContainer}>
                <Button title='Go To MoodScreen' onPress={() => navigation.navigate('MoodScreen')} />
            </View>
            <View style={styles.infoContainer}>
                <Button title='Go To WoroutScreen' onPress={() => navigation.navigate('WorkoutScreen')} />
            </View>
            <View style={styles.infoContainer}>
                <Button title='Go To WaterScreen' onPress={() => navigation.navigate('LogWaterScreen')} />
            </View>
            <View style={styles.infoContainer}>
                <Button title='Go To StepScreen' onPress={() => navigation.navigate('LogStepsScreen')} />
            </View>
            <View style={styles.infoContainer}>
                <Button title='Go To Image-Picker' onPress={() => navigation.navigate('ImagePicker')} />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 7,
        backgroundColor: 'black'
    },
    headline: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 9
    },
    infoContainer: {
        backgroundColor: '#333333',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        marginTop: 7,
    },
    infoContainer2: {
        backgroundColor: '#333333',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        marginTop: 7,
        width: "100%",
        height: 450,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
    },
    value: {
        fontSize: 16,
        color: 'white',
        marginBottom: 5,
    },
    image: {
        width: "100%",
        height: "100%",
    }
});
