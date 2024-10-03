import { StyleSheet, Text, View } from "react-native";
import { user } from "../data";

export default function MoodScreen() {
    return (
        <View style={s.container}>
            <Text style={{ color: "white" }}>Mood: {user.mood}</Text>
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