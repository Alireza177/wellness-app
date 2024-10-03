import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ImagePicker from "../lib/ImagePicker";
import HomeScreen from "../Screens/HomeScreen";
import LogStepsScreen from "../Screens/LogStepsScreen";
import LogWaterScreen from "../Screens/LogWaterScreen";
import MoodScreen from "../Screens/MoodScreen";
import WorkoutScreen from "../Screens/WorkoutScreen";

export type RootStackParamList = {
    Home: undefined;
    LogWaterScreen: undefined;
    LogStepsScreen: undefined;
    ImagePicker: undefined;
    MoodScreen: undefined;
    WorkoutScreen: undefined;
}

const RootStack = createNativeStackNavigator<RootStackParamList>();

export default function RootStackNavigator() {
    return (
        <RootStack.Navigator>
            <RootStack.Screen name="Home" component={HomeScreen} />
            <RootStack.Screen name="LogWaterScreen" component={LogWaterScreen} />
            <RootStack.Screen name="LogStepsScreen" component={LogStepsScreen} />
            <RootStack.Screen name="ImagePicker" component={ImagePicker} />
            <RootStack.Screen name="MoodScreen" component={MoodScreen} />
            <RootStack.Screen name="WorkoutScreen" component={WorkoutScreen} />
        </RootStack.Navigator>
    );
}