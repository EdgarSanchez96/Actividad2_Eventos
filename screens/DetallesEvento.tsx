import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';

interface PropsEvento {
  route: any;
  navigation: StackNavigationProp<any>;
}

export default function DetallesEvento({ route, navigation }: PropsEvento) {

  const { evento } = route.params;

  return (
    <View style={styles.container}>
      <Image
        source={
          evento.imagen
            ? { uri: evento.imagen }
            : require('../assets/default_image.png')
        }
        style={styles.eventoImagen}
      />
      <View style={styles.eventoInfo}>
        <Text style={styles.eventoTitulo}>{evento.titulo}</Text>

        <Text style={styles.eventoFecha}>{evento.fecha}</Text>

        {evento.gratuito ? (
          <Text style={styles.eventoGratuito}>Gratuito</Text>
        ) : (
          <>
            <Text style={styles.eventoPago}>De pago</Text>
            <Text style={styles.eventoCosto}>$ {evento.costo}</Text>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  eventoTitulo: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  eventoImagen: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
    borderRadius: 25,
    marginRight: 10,
    marginBottom: 20
  },
  eventoInfo: {
    marginBottom: 20,
    alignItems: 'center',
  },
  eventoFecha: {
    fontSize: 18,
    color: 'gray'
  },
  eventoGratuito: {
    fontSize: 14,
    color: 'green',
    fontWeight: 'bold',
  },
  eventoPago: {
    color: 'red',
    fontSize: 14,
  },
  eventoCosto: {
    fontSize: 14
  }
});
