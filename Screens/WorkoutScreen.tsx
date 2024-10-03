import { StyleSheet, Text, View } from "react-native";
import { user } from "../data";

export default function WorkoutScreen() {
    return (
        <View style={s.container}>
            <Text style={{ color: "white" }}>Workout: {user.workouts}</Text>
        </View>
    )
}

const s = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
    },
})