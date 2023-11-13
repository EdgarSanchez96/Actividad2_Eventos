import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

interface PropsEvento {
  route: any;
  navigation: StackNavigationProp<any>;
}

export default function DetallesEvento({ route, navigation }: PropsEvento) {
  const { evento } = route.params;
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [gratuito, setGratuito] = useState('');
  const [costo, setCosto] = useState('');

  useEffect(() => {
    const fechaCompuesta = evento.fecha_hora.split(' ');
    setFecha(fechaCompuesta[0]);
    setHora(fechaCompuesta[1]);

    const esGratuito = evento.gratuito;
    setGratuito(esGratuito ? "Gratuito" : "De pago");

    if (evento.costo !== null && evento.costo !== undefined) {
      const costoRedondeado = evento.costo.toFixed(2);
      setCosto(costoRedondeado);
    }
  }, [evento.fecha_hora, evento.gratuito, evento.costo]);

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

        <View style={styles.eventoRow}>
          <Text style={styles.eventoLabel}>Fecha: </Text>
          <Text style={styles.eventoContenido}>{fecha}</Text>
        </View>

        <View style={styles.eventoRow}>
          <Text style={styles.eventoLabel}>Hora: </Text>
          <Text style={styles.eventoContenido}>{hora}</Text>
        </View>

        <View style={styles.eventoRow}>
          <Text style={styles.eventoLabel}>Acceso: </Text>
          <Text style={{ ...styles.eventoContenido, color: evento.gratuito ? 'green' : 'red' }}>
            {gratuito}
          </Text>
        </View>

        {!evento.gratuito && (
          <View style={styles.eventoRow}>
            <Text style={styles.eventoLabel}>Costo: </Text>
            <Text style={styles.eventoContenido}>$ {costo}</Text>
          </View>
        )}
      </View>

      <Text style={styles.eventoLabel}>Descripción:</Text>
      <Text style={styles.eventoContenido}>{evento.descripcion.trim()}</Text>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  eventoInfo: {
    marginBottom: 20,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  eventoRow: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  eventoTitulo: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  eventoImagen: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 25,
    marginRight: 10,
    marginBottom: 20,
  },
  eventoLabel: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  eventoContenido: {
    fontSize: 18,
    marginLeft: 8
  },
});