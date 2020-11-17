import 'react-native-gesture-handler';

import * as React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as Colors from './constants/Colors'
import MatchScreen from './screens/MatchScreen';
import SquadScreen from './screens/SquadScreen';
import {openDatabase} from "expo-sqlite";
import {MatchProps, MatchStatus, Player} from "./classes/Classes";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MatchStack() {
  return (
      <Stack.Navigator
          initialRouteName="Match"
          screenOptions={{
            headerStyle: { backgroundColor: Colors.heslerton },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: 'bold' },
          }}>
        <Stack.Screen
            name="Match"
            component={MatchScreen}
            options={{ title: 'Match' }}
        />
        <Stack.Screen
            name="Squad"
            component={SquadScreen}
            options={{ title: 'Squad' }}
        />
      </Stack.Navigator>
  );
}

function SquadStack() {
  return (
      <Stack.Navigator
          initialRouteName="Squad"
          screenOptions={{
            headerStyle: { backgroundColor: Colors.heslerton  },
            headerTintColor: Colors.white ,
            headerTitleStyle: { fontWeight: 'bold' },
          }}>
        <Stack.Screen
            name="Squad"
            component={SquadScreen}
            options={{ title: 'Squad' }}
        />
      </Stack.Navigator>
  );
}

function App() {
  return (
      <NavigationContainer>
        <Tab.Navigator
            initialRouteName="Match"
            tabBarOptions={{
              activeTintColor: Colors.heslerton,
            }}>
          <Tab.Screen
              name="MatchStack"
              component={MatchStack}
              options={{
                tabBarLabel: 'Match',
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="soccer" color={color} size={size} />
                ),
              }}
          />
          <Tab.Screen
              name="SquadStack"
              component={SquadStack}
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
  );
}


export default App;
