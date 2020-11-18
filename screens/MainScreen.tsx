import * as React from "react";
import {NavigationContainer} from "@react-navigation/native";
import MatchScreen from "./MatchScreen";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import * as Colors from '../constants/Colors'
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import SquadScreen from "./SquadScreen";
const Tab = createBottomTabNavigator();

const MainScreen = () => {
    return (
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
    )
}

export default MainScreen;
