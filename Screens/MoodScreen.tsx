import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { user } from "../data";

export default function MoodScreen() {

    const [todaysMood, setTodaysMood] = useState('No mood has been selected');

    const addTodaysMoodInAsyncStorage = async (mood: string) => {
        try {
            await AsyncStorage.setItem('mood', mood);
            await setTodaysMood(mood);
        } catch (e) {
            console.log("An error accurred", e);
        }
    }

    const loadTodaysMoodInAsyncStorage = async () => {
        try {
            const storedMood = await AsyncStorage.getItem('mood');
            if (storedMood !== null) {
                setTodaysMood(storedMood);
            }
        } catch (e) {
            console.log("An error accurred!");
        }
    }

    useEffect(() => {
        loadTodaysMoodInAsyncStorage();
    }, [])

    return (
        <View style={s.container}>
            {user.mood.map((mood, index) => (
                <TouchableOpacity key={index} onPress={() => addTodaysMoodInAsyncStorage(mood)}>
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
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        gap: 2,
    },
    infoContainer: {
        marginLeft: 20,
        marginTop: 10,
    },
    selectedMood: {
        color: 'blue',
        marginLeft: 20,
        marginTop: 20,
        fontSize: 18,
    }

})