import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {format} from 'date-fns';
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
import DatePicker from 'react-native-date-picker';
import {
  ImageLibraryOptions,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import Toast from 'react-native-toast-message';
import {IEvento} from '../interfaces/interface';
import {guardarEvento} from '../utlils/util';

const defaultImage = require('../assets/default_image.png');

export default function NuevoEvento() {
  const tabNavigation = useNavigation<StackNavigationProp<any>>();
  const [titulo, setTitulo] = useState('');
  const [fecha, setFecha] = useState('');
  const [imagen, setImagen] = useState<string | null>();
  const [gratuito, setGratuito] = useState(true);
  const [costo, setCosto] = useState<string>(''); // Cambiado a string para permitir decimales
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [customImageSelected, setCustomImageSelected] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      limpiarCampos();
    }, []),
  );

  const limpiarCampos = () => {
    setTitulo('');
    setFecha('');
    setImagen('');
    setCustomImageSelected(false);
    setGratuito(true);
    setCosto('');
  };

  const agregarEvento = async () => {
    if (!titulo) {
      Toast.show({
        type: 'error',
        text1: 'Atención',
        text2: 'El campo Título es obligatorio..',
        visibilityTime: 3000,
      });
      return;
    }
    if (!fecha) {
      Toast.show({
        type: 'error',
        text1: 'Atención',
        text2: 'El campo Fecha es obligatorio.',
        visibilityTime: 3000,
      });
      return;
    }

    if (!gratuito) {
      const costoNumber = parseFloat(costo.replace(',', '.'));

      if (isNaN(costoNumber) || costoNumber <= 0) {
        Toast.show({
          type: 'error',
          text1: 'Atención',
          text2: 'El costo debe ser un número decimal mayor a cero.',
          visibilityTime: 3000,
        });
        return;
      }
    }

    const nuevoEvento: IEvento = {
      id: Date.now().toString(),
      titulo: titulo,
      fecha: fecha,
      imagen: customImageSelected ? imagen : null,
      costo: parseFloat(costo), // Convertir a número decimal
      gratuito: gratuito,
    };
    await guardarEvento(nuevoEvento);
    tabNavigation.navigate('Eventos');
  };

  const tomarFoto = () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      includeBase64: false,
    };

    launchCamera(options, response => {
      if (response.didCancel) {
        console.log('El usuario canceló la toma de foto.');
      } else if (response.errorCode) {
        console.error('Error al tomar la foto:', response.errorMessage);
      } else {
        let image = response.assets;
        if (image != undefined) {
          setImagen(image[0].uri);
          setCustomImageSelected(true);
        }
      }
    });
  };

  const seleccionarImagen = () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      includeBase64: false,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('El usuario canceló la selección de imágenes.');
      } else if (response.errorCode) {
        console.error('Error al seleccionar la imagen:', response.errorMessage);
      } else {
        let image = response.assets;
        if (image != undefined) {
          setImagen(image[0].uri);
          setCustomImageSelected(true);
        }
      }
    });
  };

  const onDateChange = (selectedDate: Date) => {
    setOpen(false);
    setDate(selectedDate);
    const formattedDate = format(selectedDate, 'dd/MM/yyyy');
    setFecha(formattedDate);
  };

  return (
    <View style={styles.container}>
      <Image
        source={customImageSelected ? {uri: imagen} : defaultImage}
        style={styles.imagenSeleccionada}
      />
      <TouchableOpacity style={styles.button} onPress={tomarFoto}>
        <Text style={styles.buttonText}>Tomar Foto</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={seleccionarImagen}>
        <Text style={styles.buttonText}>Seleccionar Imagen</Text>
      </TouchableOpacity>
      <Text style={styles.label}>Título:</Text>
      <TextInput
        style={styles.input}
        value={titulo}
        onChangeText={text => setTitulo(text)}
      />
      <Text style={styles.label}>Fecha:</Text>
      <TouchableOpacity onPress={() => setOpen(true)}>
        <TextInput
          style={styles.input}
          value={fecha}
          onChangeText={text => setFecha(text)}
          placeholder="Selecciona la fecha"
          editable={false}
        />
      </TouchableOpacity>
      <DatePicker
        modal
        open={open}
        date={date}
        mode="date"
        onConfirm={date => {
          onDateChange(date);
        }}
        onCancel={() => setOpen(false)}
      />
      <View style={styles.switchContainer}>
        <Text style={styles.label}>¿Gratuito?:</Text>
        <Switch
          trackColor={{false: '#767577', true: '#F6ECEB'}}
          thumbColor={gratuito ? '#fbbc14' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={() => setGratuito(!gratuito)}
          value={gratuito}
        />
        <Text style={styles.switchText}>
          {gratuito ? 'Sí' : 'No, evento de pago'}
        </Text>
      </View>
      {!gratuito && (
        <>
          <View>
            <Text style={styles.label}>Costo del Evento:</Text>
            <TextInput
              style={styles.input}
              value={costo ? costo.toString() : ''}
              onChangeText={text => setCosto(text)}
              keyboardType="decimal-pad"
            />
          </View>
        </>
      )}

      <TouchableOpacity style={styles.buttonPrimary} onPress={agregarEvento}>
        <Text style={styles.buttonTextPrimary}>Agregar Evento</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonSecondary}
        onPress={() => tabNavigation.navigate('Eventos')}>
        <Text style={styles.buttonTextSecondary}>Listar Eventos</Text>
      </TouchableOpacity>
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
