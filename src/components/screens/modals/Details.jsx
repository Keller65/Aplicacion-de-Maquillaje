import { View, Text } from 'react-native';
import React from 'react';
import 'react-native-gesture-handler';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Home from './src/components/screens/Home';
import Search from './src/components/screens/Search';
import HomeScreen from './src/components/screens/modals/HomeScreen';

const Tabs = createMaterialBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='HomeScreen' component={HomeScreen} />
      <Stack.Screen name='Details' component={Home} />
    </Stack.Navigator>
  )
}

function TabNavigator() {
  return (
    <Tabs.Navigator>
      <Tabs.Screen name='Home' component={HomeStackNavigator} />
      <Tabs.Screen name='Search' component={Search} />
    </Tabs.Navigator>
  )
}

function App() {
  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  )
}

export default App;