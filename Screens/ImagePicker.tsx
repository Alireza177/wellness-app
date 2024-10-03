
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { Button, Image, ScrollView, StyleSheet, View } from 'react-native';

export default function ImagePickerExample() {
    const [image, setImage] = useState<string | null>(null);

    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        console.log('Permission status:', status);
        if (status === 'granted') {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: false,
            });
            console.log('Image picker result:', result);

            if (!result.canceled) {
                setImage(result.assets[0].uri);
            } else {
                console.log('User canceled image picker');
            }
        } else {
            alert('Permission to access media library is required!');
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollView}>
            <View>
                <Image
                    style={styles.image}
                    source={require('../selfies/OIP.jpg')}
                />
            </View>
            <View style={styles.container}>
                <Button title="Pick an image from camera roll" onPress={pickImage} color="#841584" />
                {image && <Image source={{ uri: image }} style={styles.image} />}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollView: {
        flexGrow: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
    },
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 300,
        height: 300,
        borderRadius: 10,
        // margin: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
});