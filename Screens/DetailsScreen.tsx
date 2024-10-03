import { StyleSheet, Text, View } from 'react-native';
import ImagePicker from '../lib/ImagePicker';

export default function DetailsScreen() {
    return (
        <View style={styles.container}>
            <View style={styles.headline}>
                <Text>HERE IS YOUR SELFIES</Text>
            </View>
            <View>
                <ImagePicker />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headline: {
        marginTop: 35
    }
});
