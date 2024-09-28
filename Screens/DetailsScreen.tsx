import { StyleSheet, Text, View } from 'react-native';

export default function DetailsScreen() {
    return (
        <View style={styles.container}>
            <Text>DetailsScreen</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
