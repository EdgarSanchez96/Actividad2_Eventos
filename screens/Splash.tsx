import {
    NativeStackNavigationProp
} from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import * as Animatable from 'react-native-animatable';

// Definir el tipo de las rutas y la navegación
type RootStackParamList = {
  Splash: undefined;
  Home: undefined;
};

type SplashNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Splash'
>;

type SplashProps = {
  navigation: SplashNavigationProp;
};
export default function Splash({navigation}: SplashProps) {
  //https://developer.mozilla.org/es/docs/Web/API/setTimeout
  useEffect(() => {
    setTimeout(() => {
      //navigate y despues lanzar la pregunta
      navigation.replace('Home');
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      <Animatable.Text
        style={styles.fuente}
        duration={2000}
        animation="slideInDown">
        Splash
      </Animatable.Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fuente: {
    color: 'white',
    fontSize: 36,
    fontWeight: '800',
  },
});
