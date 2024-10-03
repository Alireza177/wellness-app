import { Pedometer } from 'expo-sensors';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function StepCounter() {
    const [isPedometerAvailable, setIsPedometerAvailable] = useState('checking');
    const [pastStepCount, setPastStepCount] = useState(0);
    const [currentStepCount, setCurrentStepCount] = useState(0);


    const subscribe = async () => {
        setIsPedometerAvailable('granted');

        if (isPedometerAvailable === 'granted') {
            const end = new Date();
            const start = new Date();
            start.setDate(end.getDate() - 1);

            const pastStepCountResult = await Pedometer.getStepCountAsync(start, end);
            if (pastStepCountResult) {
                setPastStepCount(pastStepCountResult.steps);
            }

            return Pedometer.watchStepCount(result => {
                setCurrentStepCount(result.steps);
            });
        }
    };

    useEffect(() => {
        const subscribeAsync = async () => {
            const permissionGranted = await Pedometer.requestPermissionsAsync();
            if (permissionGranted) {
                // await setIsPedometerAvailable();
                const subscription = await subscribe();
                return () => subscription && subscription.remove();
            } else {
                setIsPedometerAvailable('Permission not granted');
            }
        };

        subscribeAsync();

        return () => {
            subscribeAsync().then(cleanup => cleanup && cleanup());
        };
    }, []);

    return (
        <View style={styles.container}>
            <Text style={{ color: 'white' }}>Pedometer.isAvailableAsync(): {isPedometerAvailable}</Text>
            <Text style={{ color: 'white' }}>Steps taken in the last 24 hours: {pastStepCount}</Text>
            <Text style={{ color: 'white' }}>Walk! And watch this go up: {currentStepCount}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 15,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'black',
    },
});
