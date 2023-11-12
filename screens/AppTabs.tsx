import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Eventos from './Eventos';
import Home from './Home';
import NuevoEvento from './NuevoEvento';

const Tab = createMaterialBottomTabNavigator();
export default function AppTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#fbbc14"
      inactiveColor="white"
      barStyle={{backgroundColor: '#413c28'}}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Inicio',
          tabBarIcon: ({ color }) => (
            <Icon name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Eventos"
        component={Eventos}
        options={{
          tabBarLabel: 'Eventos',
          tabBarIcon: ({color}) => (
            <Icon name="event" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="NuevoEvento"
        component={NuevoEvento}
        options={{
          tabBarLabel: 'Nuevo Evento',
          tabBarIcon: ({color}) => (
            <Icon
              name="add"
              color={color}
              size={26}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
