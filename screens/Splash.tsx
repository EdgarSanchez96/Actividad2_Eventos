import React, {useEffect} from 'react';
import {StyleSheet, View, Image, Text} from 'react-native';
import * as Animatable from 'react-native-animatable';

import {StackNavigationProp} from '@react-navigation/stack';

interface Props {
  navigation: StackNavigationProp<any>;
}

export default function Splash({navigation}: Props) {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Home');
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Animatable.Text
          style={styles.title}
          duration={2000}
          animation="slideInDown">
          EVENTOS LOJA
        </Animatable.Text>
        <Text style={styles.slogan}>Conoce mi ciudad</Text>
      </View>
      <Image
        style={styles.image}
        source={require('../assets/logo_splash.png')}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#E94067',
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
    color: 'white',
    fontSize: 18,
    fontWeight: '400',
  },
  image: {
    marginRight: 30,
    marginTop: 10,
    width: '40%',
  },
});
