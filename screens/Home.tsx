import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {Button, Image, StyleSheet, View} from 'react-native';

interface Props {
  navigation: StackNavigationProp<any>;
}

export default function Home({navigation}: Props) {
  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require('../assets/logo.png')}
      />
      <View style={styles.buttonContainer}>
        <Button
          title="Ir a los eventos"
          onPress={() => navigation.navigate('Eventos')}
          color="#E94067"
        />
        <View style={styles.separator} />
        <Button
          title="Nuevo evento"
          onPress={() => navigation.navigate('NuevoEvento')}
          color="#E94067"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F6ECEB',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fuente: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonContainer: {
    marginTop: 20,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  separator: {
    marginVertical: 10,
  },
});
