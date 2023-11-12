import React from 'react';
import {StatusBar} from 'react-native';
import Toast from 'react-native-toast-message';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TituloLogo from './components/TituloLogo';
import AppTabs from './screens/AppTabs';
import DetallesEvento from './screens/DetallesEvento';
import Eventos from './screens/Eventos';
import Home from './screens/Home';
import NuevoEvento from './screens/NuevoEvento';
import Splash from './screens/Splash';

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  return (
    <>
      <StatusBar backgroundColor="#fbbc14" barStyle="light-content" />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash">
          <Stack.Screen
            name="Splash"
            component={Splash}
            options={{
              title: '',
              headerStyle: {
                backgroundColor: '#fbbc14',
              },
              headerTintColor: '#fbbc14',
              headerShadowVisible: false,
            }}
          />
          <Stack.Screen
            name="AppTabs"
            component={AppTabs}
            options={{
              headerShown: true,
              headerTitle: props => (
                <TituloLogo titulo="Eventos Loja - FIAVL" />
              ),
              headerStyle: {
                backgroundColor: '#fbbc14',
              },
              headerShadowVisible: false,
            }}
          />
           <Stack.Screen
            name="DetallesEvento"
            component={DetallesEvento}
            options={{
              title: 'Detalles del Evento'
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </>
  );
}

export default App;
