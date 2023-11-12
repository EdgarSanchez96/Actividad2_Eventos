import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

interface TituloLogoProps {
  titulo: string;
}

const TituloLogo: React.FC<TituloLogoProps> = ({titulo}) => {
  return (
    <View style={styles.container}>
      <Image style={styles.imagen} source={require('../assets/logo.png')} />
      <Text style={styles.fuente}>{titulo}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    flexDirection: 'row',
  },
  imagen: {
    width: 40,
    height: 40,
  },
  fuente: {
    flex: 1,
    marginStart: 10,
    alignSelf: 'center',
    color: '#413c28',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default TituloLogo;
