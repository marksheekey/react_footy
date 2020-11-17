import 'react-native-gesture-handler';

import * as React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as Colors from './constants/Colors'
import MatchScreen from './screens/MatchScreen';
import SquadScreen from './screens/SquadScreen';
const Tab = createBottomTabNavigator();

function App() {
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
  );
}


export default App;
