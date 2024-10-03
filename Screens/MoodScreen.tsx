import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { user } from "../data";

export default function MoodScreen() {

    const [todaysMood, setTodaysMood] = useState('No mood has been selected');

    return (
        <View style={s.container}>
            {user.mood.map((mood, index) => (
                <TouchableOpacity key={index} onPress={() => setTodaysMood(mood)}>
                    <Text style={s.infoContainer}>Mood: {mood}</Text>
                </TouchableOpacity>
            ))}
            <Text style={s.selectedMood}>Today's Mood: {todaysMood}</Text>
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
    selectedMood: {
        color: 'yellow',
        marginLeft: 20,
        marginTop: 20,
        fontSize: 18,
    }

})