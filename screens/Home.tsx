import {View, Text, StyleSheet, Button} from 'react-native';
import React from 'react';
import {StackNavigationProp} from '@react-navigation/stack';

interface Props {
  navigation: StackNavigationProp<any>;
}

export default function Home({navigation}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.fuente}>Inicio</Text>
      <View style={styles.buttonContainer}>
        <Button
          title="Ir a los eventos"
          onPress={() => navigation.navigate('Eventos')}
          color="#6200ea" // Color personalizado para el botón
        />
        <View style={styles.separator} />
        <Button
          title="Nuevo evento"
          onPress={() => navigation.navigate('NuevoEvento')}
          color="#6200ea" // Color personalizado para el botón
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#03dac6',
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
    marginBottom: 20,
  },
  separator: {
    marginVertical: 10,
  },
});
