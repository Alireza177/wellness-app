import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack/types';
import { user } from '../data';
import LocationExpo from '../lib/Location';
import { RootStackParamList } from '../navigators/RootStackNavigator';

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export default function HomeScreen({ navigation }: Props) {
    return (
        <ScrollView style={styles.container}>
            <View style={styles.infoContainer}>
                <View>
                    <Text style={styles.headline}>Personal Information</Text>
                    <Text style={styles.label}>Fullname:</Text>
                    <Text style={styles.value}>{user.fullname}</Text>
                    <Text style={styles.label}>Age:</Text>
                    <Text style={styles.value}>{user.age}</Text>
                    <Text style={styles.label}>Weight:</Text>
                    <Text style={styles.value}>{user.weight} kg</Text>
                    <Text style={styles.label}>Height:</Text>
                    <Text style={styles.value}>{user.height} cm</Text>
                </View>
                <View>
                    <Image
                        style={styles.image}
                        source={require('../selfies/OIP.jpg')}
                    />
                </View>
            </View>
            <View style={styles.infoContainer}>
                <LocationExpo />
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('MoodScreen')}>
                    <Text style={styles.buttonText}>Go To MoodScreen</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('WorkoutScreen')}>
                    <Text style={styles.buttonText}>Go To WorkoutScreen</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('LogWaterScreen')}>
                    <Text style={styles.buttonText}>Go To WaterScreen</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('LogStepsScreen')}>
                    <Text style={styles.buttonText}>Go To StepScreen</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ImagePicker')}>
                    <Text style={styles.buttonText}>Go To Image-Picker</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    headline: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 10,
    },
    infoContainer: {
        backgroundColor: '#333333',
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
        flexDirection: 'row',
    },
    imageContainer: {
        backgroundColor: '#333333',
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
        alignItems: 'center',
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 5,
    },
    value: {
        fontSize: 16,
        color: 'white',
        marginBottom: 10,
    },
    image: {
        marginTop: 45,
        marginLeft: -60,
        width: 200,
        height: 200,
        borderRadius: 150,
    },
    buttonContainer: {
        marginTop: 20,
    },
    button: {
        backgroundColor: '#1E90FF',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
