import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {ImageBackground, StyleSheet} from 'react-native';

interface Props {
  navigation: StackNavigationProp<any>;
}

const Tab = createMaterialBottomTabNavigator();
export default function Home({navigation}: Props) {
  return (
    <ImageBackground
      style={styles.backgroundImage}
      source={require('../assets/fondo.webp')}></ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // o 'stretch' según prefieras
  },
});
