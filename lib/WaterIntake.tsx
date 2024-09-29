import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

export default function WaterIntake() {
    const [water, setWater] = useState(0);

    const addGlass = () => {
        setWater(water + 1);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Dagens Vattenintag</Text>
            <TextInput
                style={styles.input}
                value={String(water)}
                onChangeText={text => setWater(Number(text))}
                keyboardType="numeric"
            />
            <Button title="Lägg till ett glas" onPress={addGlass} />
            <Text style={{ color: 'white', marginTop: 7 }}>Du har druckit {water} glas vatten idag.</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
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
