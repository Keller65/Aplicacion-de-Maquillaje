import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Foundation from 'react-native-vector-icons/Foundation';
import Feather from 'react-native-vector-icons/Feather';

import Home from './components/screens/Home';
import Profile from './components/screens/Profile';
import Cart from './components/screens/Cart';
import Search from './components/screens/Search';
import Orders from './components/screens/Orders';

const Tab = createBottomTabNavigator();
const ActiveColor = '#000';
const InActiveColor = true;

const Menu = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: {
                    elevation: 0,
                    shadowColor: '#fff',
                    shadowOpacity: 0,
                    shadowOffset: {
                        width: 0,
                        height: 0
                    },
                    borderWidth: 0,
                    borderColor: 'transparent',
                    margin: 5,
                    backgroundColor: 'transparent'
                },
            }}
        >

            <Tab.Screen
                name='Inicio'
                component={Home}

                options={{
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome name='home' color={color} size={size} />
                    ),
                    tabBarActiveTintColor: ActiveColor,
                    tabBarInactiveBackgroundColor: InActiveColor,
                }}
            />

            <Tab.Screen
                name='Buscador'
                component={Search}

                options={{
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarIcon: ({ color, size }) => (
                        <Feather name='search' color={color} size={size} />
                    ),
                    tabBarActiveTintColor: ActiveColor,
                    tabBarInactiveBackgroundColor: InActiveColor
                }}
            />

            <Tab.Screen
                name='Carrito'
                component={Cart}

                options={{
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name='bag-handle' color={color} size={size} />
                    ),
                    tabBarActiveTintColor: ActiveColor,
                    tabBarInactiveBackgroundColor: InActiveColor
                }}
            />

            <Tab.Screen
                name='Pedidos'
                component={Orders}

                options={{
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name='layers' color={color} size={size} />
                    ),
                    tabBarActiveTintColor: ActiveColor,
                    tabBarInactiveBackgroundColor: InActiveColor
                }}
            />

            <Tab.Screen
                name='Perfil'
                component={Profile}

                options={{
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name='person-circle-sharp' color={color} size={size} />
                    ),
                    tabBarActiveTintColor: ActiveColor,
                    tabBarInactiveBackgroundColor: InActiveColor
                }}
            />
        </Tab.Navigator>
    )
}

export default Menu;