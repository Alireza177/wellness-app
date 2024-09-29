import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DetailsScreen from "../Screens/DetailsScreen";
import HomeScreen from "../Screens/HomeScreen";

export type RootStackParamList = {
    Home: undefined;
    Details: { id: string }
}

const RootStack = createNativeStackNavigator<RootStackParamList>();

export default function RootStackNavigator() {
    return (
        <RootStack.Navigator>
            <RootStack.Screen name="Home" component={HomeScreen} />
            <RootStack.Screen name="Details" component={DetailsScreen} />
        </RootStack.Navigator>
    );
}