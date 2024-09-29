import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

export default function WaterIntake() {
    const [water, setWater] = useState<number>(0);

    const addGlass = () => {
        setWater(prev => {
            const newWater = prev + 1;
            storeData('water', newWater.toString());
            return newWater;
        });
    };

    const storeData = async (key: string, value: string) => {
        try {
            await AsyncStorage.setItem(key, value);
        } catch (e) {
            console.error("Failed to save data:", e);
        }
    }

    const getData = async (key: string) => {
        try {
            const value = await AsyncStorage.getItem(key);

            if (value !== null) {
                setWater(Number(value));
            }
        } catch (e) {
            console.error("error to fetch data:", e);
        }
    }

    useEffect(() => {
        getData('water');
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Today's Water Intake</Text>
            <TextInput
                style={styles.input}
                value={String(water)}
                onChangeText={text => setWater(Number(text))}
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
