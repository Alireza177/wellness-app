import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import HomeScreen from '../Screens/HomeScreen';
import ImagePicker from '../Screens/ImagePicker';
import LogStepsScreen from '../Screens/LogStepsScreen';
import LogWaterScreen from '../Screens/LogWaterScreen';
import MoodScreen from '../Screens/MoodScreen';
import WorkoutScreen from '../Screens/WorkoutScreen';

export type TabParamList = {
    Home: undefined;
    LogWaterScreen: undefined;
    LogStepsScreen: undefined;
    ImagePicker: undefined;
    MoodScreen: undefined;
    WorkoutScreen: undefined;
}

const Tab = createBottomTabNavigator<TabParamList>();

export default function TabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={({ navigation }) => ({
                "headerRight": (props) =>
                (<MaterialIcons
                    style={{ marginRight: 16 }}
                    name="settings"
                    size={24}
                    color={props.tintColor}
                    onPress={() => navigation.navigate("Settings")}
                />
                ),
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="MoodScreen" component={MoodScreen} />
            <Tab.Screen name="WorkoutScreen" component={WorkoutScreen} />
            <Tab.Screen name="LogWaterScreen" component={LogWaterScreen} />
            <Tab.Screen name="LogStepsScreen" component={LogStepsScreen} />
            <Tab.Screen name="ImagePicker" component={ImagePicker} />
        </Tab.Navigator>
    );
}
