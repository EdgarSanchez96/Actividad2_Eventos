import React from 'react';
import {StyleSheet, StatusBar} from 'react-native';
import Toast from 'react-native-toast-message'

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './screens/Home';
import ScreenA from './screens/ScreenA';
import Eventos from './screens/Eventos';
import NuevoEvento from './screens/NuevoEvento';
import TituloLogo from './components/TituloLogo';
import Splash from './screens/Splash';

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  return (
    <>
      <StatusBar backgroundColor="#E94067" barStyle="light-content" />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash">
          <Stack.Screen
            name="Splash"
            component={Splash}
            options={{
              title: '',
              headerStyle: {
                backgroundColor: '#E94067',
              },
              headerTintColor: '#E94067',
              headerShadowVisible: false,
            }}
          />
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              headerTitle: props => <TituloLogo titulo="Eventos Loja" />,
            }}
          />
          <Stack.Screen name="ScreenA" component={ScreenA} />
          <Stack.Screen name="Eventos" component={Eventos} />
          <Stack.Screen
            name="NuevoEvento"
            component={NuevoEvento}
            options={{
              headerShadowVisible: false,
              headerStyle: {
                backgroundColor: '#fff',
              },
              contentStyle: {
                backgroundColor: '#fff',
              },
              title:'Nuevo Evento'
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </>
  );
}

export default App;
