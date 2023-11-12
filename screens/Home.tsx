import React from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {Button, Image, StyleSheet, View} from 'react-native';

interface Props {
  navigation: StackNavigationProp<any>;
}

export default function Home({navigation}: Props) {
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require('../assets/logo.png')} />
      <View style={styles.buttonContainer}>
        <CustomButton
          title="Ir a los eventos"
          onPress={() => navigation.navigate('Eventos')}
          color="#E94067"
        />
        <View style={styles.separator} />
        <CustomButton
          title="Nuevo evento"
          onPress={() => navigation.navigate('NuevoEvento')}
          color="#E94067"
        />
      </View>
    </View>
  );
}

const CustomButton = ({title, onPress, color}: any) => (
  <View style={styles.button}>
    <Button title={title} onPress={onPress} color={color} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F6ECEB',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  button: {
    width: '80%',
    marginBottom: 15,
    borderRadius: 10,
    overflow: 'hidden',
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
