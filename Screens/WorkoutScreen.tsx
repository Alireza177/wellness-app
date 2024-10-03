import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { user } from "../data";

export default function WorkoutScreen() {

    const [todaysWorkout, setTodaysWorkout] = useState('No workout have been choosen yet!');

    const addTodaysWorkoutInAsyncStorage = async (workout: string) => {
        try {
            await AsyncStorage.setItem('workout', workout);
            await setTodaysWorkout(workout);

        } catch (e) {
            console.error("An error accurred: ", e);
        }
    }

    const loadTodaysWorkoutFromAsyncStorage = async () => {
        try {
            const storedWorkout = await AsyncStorage.getItem('workout');
            if (storedWorkout !== null) {
                setTodaysWorkout(storedWorkout);
            }
        } catch (e) {
            console.error("Failed to load today's workout: ", e);
        }
    };

    useEffect(() => {
        loadTodaysWorkoutFromAsyncStorage();
    }, []);


    return (
        <View style={s.container}>
            {user.workouts.map((workout, index) => (
                <TouchableOpacity key={index} onPress={() => addTodaysWorkoutInAsyncStorage(workout)}>
                    <Text style={s.infoContainer}>Workout: {workout}</Text>
                </TouchableOpacity>
            ))}
            <Text style={s.selectedWorkout}>Today's Workout: {todaysWorkout}</Text>
        </View>
    )
}

const s = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        gap: 2,
    },
    infoContainer: {
        color: 'white',
        marginLeft: 20,
        marginTop: 10,
    },
    selectedWorkout: {
        color: 'yellow',
        marginLeft: 20,
        marginTop: 20,
        fontSize: 18,
    }

})