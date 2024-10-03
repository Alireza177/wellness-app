import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { user } from "../data";

export default function WorkoutScreen() {

    const [todaysWorkout, setTodaysWorkout] = useState('No wprkout have been choosen yet');

    return (
        <View style={s.container}>
            {user.workouts.map((workout, index) => (
                <TouchableOpacity key={index} onPress={() => setTodaysWorkout(workout)}>
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