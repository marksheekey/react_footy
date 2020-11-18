import * as React from "react";
import {NavigationContainer} from "@react-navigation/native";
import MatchScreen from "./MatchScreen";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import * as Colors from '../constants/Colors'
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import SquadScreen from "./SquadScreen";
import { Provider as PaperProvider , Appbar} from 'react-native-paper';
import styles from "../styles/styles";
import {View} from "react-native";
const Tab = createBottomTabNavigator();

const MainScreen = () => {
    return (
        <View style={styles.innerContainer}>
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName="Match"
                tabBarOptions={{
                    activeTintColor: Colors.heslerton,
                }}>
                <Tab.Screen
                    name="Match"
                    component={MatchScreen}
                    options={{
                        tabBarLabel: 'Match',
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="soccer" color={color} size={size} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Squad"
                    component={SquadScreen}
                    options={{
                        tabBarLabel: 'Squad',
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons
                                name="account-group"
                                color={color}
                                size={size}
                            />
                        ),
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
        </View>
    )
}

export default MainScreen;
