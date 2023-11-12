import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

const NuevoEventoScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [titulo, setTitulo] = useState('');
  const [fecha, setFecha] = useState('');

  const agregarEvento = () => {
    // Lógica para agregar el nuevo evento a la lista o base de datos
    // Puedes utilizar un estado global, Redux, AsyncStorage, etc.
    const nuevoEvento = { id: Date.now().toString(), titulo, fecha };
    // ... lógica para agregar el evento
    navigation.navigate('Eventos'); // Navegar de vuelta a la pantalla de eventos
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Título del Evento</Text>
      <TextInput
        style={styles.input}
        value={titulo}
        onChangeText={(text) => setTitulo(text)}
      />
      <Text style={styles.label}>Fecha del Evento</Text>
      <TextInput
        style={styles.input}
        value={fecha}
        onChangeText={(text) => setFecha(text)}
      />
      <TouchableOpacity style={styles.button} onPress={agregarEvento}>
        <Text style={styles.buttonText}>Agregar Evento</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default NuevoEventoScreen;
