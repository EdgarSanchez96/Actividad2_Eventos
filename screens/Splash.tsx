import React, {useEffect} from 'react';
import {StyleSheet, View, Image, Text} from 'react-native';
import * as Animatable from 'react-native-animatable';

import {StackNavigationProp} from '@react-navigation/stack';
import {guardarEventos, obtenerEventos} from '../utlils/util';

interface Props {
  navigation: StackNavigationProp<any>;
}

export default function Splash({navigation}: Props) {
  useEffect(() => {
    const obtenerYGuardarEventos = async () => {
      try {
        const eventos = await obtenerEventos();
        await guardarEventos(eventos);
        setTimeout(() => {
          navigation.replace('AppTabs');
        }, 2000);
      } catch (error) {
        console.error('Error en Splash:', error);
      }
    };

    obtenerYGuardarEventos();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Animatable.Text
          style={styles.title}
          duration={2000}
          animation="slideInDown">
          EVENTOS LOJA
        </Animatable.Text>
        <Text style={styles.slogan}>Festival Internacional de Artes Vivas</Text>
      </View>
      <Image
        style={styles.image}
        source={require('../assets/logo_splash.jpg')}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fbbc14',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 30,
  },
  title: {
    color: 'white',
    fontSize: 36,
    fontWeight: '800',
    marginBottom: 10,
  },
  slogan: {
    color: '#413c28',
    fontSize: 18,
    fontWeight: '600',
  },
  image: {
    marginRight: 30,
    marginTop: 10,
    width: '40%',
    justifyContent: 'center',
    alignItems: 'flex-end',

  },
});
