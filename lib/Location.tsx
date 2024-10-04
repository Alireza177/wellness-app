// import * as Device from 'expo-device';
// import * as Location from 'expo-location';
// import { useEffect, useState } from 'react';
// import { Platform, StyleSheet, Text, View } from 'react-native';

// export default function LocationExpo() {
//     const [location, setLocation] = useState(null);
//     const [errorMsg, setErrorMsg] = useState(null);

//     useEffect(() => {
//         (async () => {
//             if (Platform.OS === 'android' && !Device.isDevice) {
//                 setErrorMsg(
//                     'Oops, this will not work on Snack in an Android Emulator. Try it on your device!'
//                 );
//                 return;
//             }
//             let { status } = await Location.requestForegroundPermissionsAsync();
//             if (status !== 'granted') {
//                 setErrorMsg('Permission to access location was denied');
//                 return;
//             }

//             let location = await Location.getCurrentPositionAsync({});
//             setLocation(location);
//         })();
//     }, []);

//     let text = 'Waiting..';
//     if (errorMsg) {
//         text = errorMsg;
//     } else if (location) {
//         text = JSON.stringify(location);
//     }

//     return (
//         <View style={styles.container}>
//             <Text style={styles.paragraph}>{text}</Text>
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'center',
//         padding: 20,
//     },
//     paragraph: {
//         fontSize: 18,
//         textAlign: 'center',
//         color: 'white',
//     },
// });

import * as Device from 'expo-device';
import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function LocationExpo() {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
        (async () => {
            if (Platform.OS === 'android' && !Device.isDevice) {
                setErrorMsg(
                    'Oops, this will not work on Snack in an Android Emulator. Try it on your device!'
                );
                return;
            }
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        })();
    }, []);

    let text = 'Waiting..';
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        text = 'Your current location: ' + JSON.stringify(location.coords);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Your Current Location:</Text>
            {location ? (
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01,
                    }}
                    showsUserLocation={true}
                >
                    <Marker
                        coordinate={{
                            latitude: location.coords.latitude,
                            longitude: location.coords.longitude,
                        }}
                        title="You are here"
                    />
                </MapView>
            ) : (
                <Text style={styles.paragraph}>{text}</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    label: {
        fontSize: 18,
        marginBottom: 10,
        // marginTop: 10,
        color: 'black',
    },
    map: {
        width: "100%",
        height: 250,
    },
    paragraph: {
        fontSize: 18,
        textAlign: 'center',
    },
});
