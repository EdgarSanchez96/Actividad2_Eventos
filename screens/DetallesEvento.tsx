import {StackNavigationProp} from '@react-navigation/stack';
import React, {useState} from 'react';
import {
    Image,
    StyleSheet,
    Switch,
    Text,
    TextInput,
    TouchableOpacity,
    View,
  } from 'react-native';

interface Props {
navigation: StackNavigationProp<any>;
}

export default function DetallesEvento({navigation}: Props) {
  
  const [titulo, setTitulo] = useState('');
  const [fecha, setFecha] = useState('');
  const [imagen, setImagen] = useState<string | null>();
  const [gratuito, setGratuito] = useState(true);
  const [costo, setCosto] = useState<string>(''); // Cambiado a string para permitir decimales
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  return (
      <View style={styles.container}>
            <Text style={styles.label}>EJEMPLO</Text>
      </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
    },
    label: {
      fontSize: 16,
      marginBottom: 5,
      fontWeight: 'bold',
    },
    input: {
      height: 40,
      borderColor: '#413c28',
      borderWidth: 1,
      marginBottom: 20,
      paddingHorizontal: 10,
      borderRadius: 20,
    },
    datePicker: {
      width: '100%',
      marginBottom: 20,
      borderRadius: 20,
    },
    button: {
      backgroundColor: '#F6ECEB',
      padding: 10,
      borderRadius: 20,
      marginBottom: 10,
    },
    buttonSecondary: {
      backgroundColor: '#413c28',
      padding: 10,
      borderRadius: 20,
      marginBottom: 10,
    },
    buttonText: {
      color: '#413c28',
      fontSize: 16,
      textAlign: 'center',
    },
    buttonTextSecondary: {
      color: 'white',
      fontSize: 16,
      textAlign: 'center',
    },
    buttonTextPrimary: {
      color: '#413c28',
      fontSize: 16,
      textAlign: 'center',
    },
    buttonPrimary: {
      backgroundColor: '#fbbc14',
      padding: 10,
      borderRadius: 20,
      marginBottom: 10,
    },
    imagenSeleccionada: {
      width: 'auto',
      height: 200,
      resizeMode: 'contain',
      marginBottom: 10,
    },
    switchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
    },
    switchText: {
      marginLeft: 5,
      fontSize: 14,
    },
  });
  