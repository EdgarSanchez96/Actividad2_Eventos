import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

interface Evento {
  id: string;
  titulo: string;
  fecha: string;
}

const Eventos: React.FC<{ navigation: any }> = ({ navigation }) => {
  const eventos: Evento[] = [
    { id: '1', titulo: 'Concierto en el Parque', fecha: '10 de noviembre' },
    { id: '2', titulo: 'Feria de Arte Local', fecha: '15 de noviembre' },
    // ... otros eventos
  ];

  return (
    <View style={styles.container}>
      <FlatList
        data={eventos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.eventoCard}
            onPress={() => navigation.navigate('DetallesEvento', { evento: item })}
          >
            <Text style={styles.eventoTitulo}>{item.titulo}</Text>
            <Text style={styles.eventoFecha}>{item.fecha}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  eventoCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  eventoTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  eventoFecha: {
    fontSize: 14,
    color: 'gray',
  },
});

export default Eventos;
