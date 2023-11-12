/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {StyleSheet} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './screens/Home';
import ScreenA from './screens/ScreenA';
import Eventos from './screens/Eventos';
import TituloLogo from './components/TituloLogo';

import Splash from './screens/Splash';

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{
            title: '',
            headerStyle: {
              backgroundColor: '#000',
            },
            headerTintColor: '#000',
          }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerTitle: props => <TituloLogo titulo="Eventos" />}}
        />
        <Stack.Screen name="ScreenA" component={ScreenA} />
        <Stack.Screen name="Eventos" component={Eventos} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
