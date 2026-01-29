import React from 'react';
import {
  Home,
  AddPlayers,
  Scoreboard,
  GameDetails,
  CurrentGameHistory,
  FinalJeopardy,
  FinalScores,
  ExitGameModal
} from './components';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createGameTable, createMoveTable, createPlayerTable } from './api';

const Stack = createStackNavigator();

export default function App() {
  React.useEffect(() => {
    createPlayerTable();
    createGameTable();
    createMoveTable();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ExitGameModal"
          component={ExitGameModal}
          options={{
            headerShown: false,
            gestureEnabled: false
          }}
        />
        <Stack.Screen
          name="AddPlayers"
          component={AddPlayers}
          options={{
            headerTransparent: true,
            headerTitle: '',
            headerTitleStyle: { color: 'white' },
            headerTintColor: 'white',
          }}
        />
        <Stack.Screen
          name="GameDetails"
          component={GameDetails}
          options={{
            headerTransparent: true,
            headerTitle: '',
            headerTitleStyle: { color: 'white' },
            headerTintColor: 'white',
          }}
        />
        <Stack.Screen
          name="Scoreboard"
          component={Scoreboard}
          options={{
            headerShown: false,
            gestureEnabled: false
          }}
        />
        <Stack.Screen
          name="CurrentGameHistory"
          component={CurrentGameHistory}
          options={{
            headerTransparent: true,
            headerTitle: '',
            headerTitleStyle: { color: 'white' },
            headerTintColor: 'white',
          }}
        />
        <Stack.Screen
          name="FinalJeopardy"
          component={FinalJeopardy}
          options={{
            headerTransparent: true,
            headerTitle: '',
            headerTitleStyle: { color: 'white' },
            headerTintColor: 'white',
          }}
        />
        <Stack.Screen
          name="FinalScores"
          component={FinalScores}
          options={{
            headerTransparent: true,
            headerTitle: '',
            headerTitleStyle: { color: 'white' },
            headerTintColor: 'white',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
