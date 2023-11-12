import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { Button, ImageBackground, StyleSheet, View } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface Props {
  navigation: StackNavigationProp<any>;
}

const Tab = createMaterialBottomTabNavigator();
export default function Home({ navigation }: Props) {
  return (
    <ImageBackground
      style={styles.backgroundImage}
      source={require('../assets/fondo.webp')}
    >
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <CustomButton
            title="Ir a los eventos"
            onPress={() => navigation.navigate('Eventos')}
            color="#413c28"
          />
          <View style={styles.separator} />
          <CustomButton
            title="Nuevo evento"
            onPress={() => navigation.navigate('NuevoEvento')}
            color="#413c28"
          />
        </View>
      </View>
    </ImageBackground>
  );
}

const CustomButton = ({ title, onPress, color }: any) => (
  <View style={styles.button}>
    <Button title={title} onPress={onPress} color={color} />
  </View>
);

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // o 'stretch' según prefieras
  },
  container: {
    backgroundColor: 'rgba(0,0,0,0.0)',
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  buttonContainer: {
    marginBottom: 50, 
    alignItems: 'center',
  },
  button: {
    width: '80%',
    marginBottom: 15,
    borderRadius: 10,
    overflow: 'hidden',
  },
  separator: {
    marginVertical: 5,
  },
});
