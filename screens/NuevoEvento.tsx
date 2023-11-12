import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useState} from 'react';
import {format} from 'date-fns';
import {
  Image,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
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
import Dialog from 'react-native-dialog';

export default function NuevoEvento() {
  const tabNavigation = useNavigation<StackNavigationProp<any>>();
  const [titulo, setTitulo] = useState('');
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [imagen, setImagen] = useState<string | null>();
  const [gratuito, setGratuito] = useState(true);
  const [costo, setCosto] = useState<string>(''); // Cambiado a string para permitir decimales
  const [date, setDate] = useState(new Date());
  const [descripcion, setDescripcion] = useState<string>(''); // Nuevo campo para la descripción
  const [openFecha, setOpenFecha] = useState(false);
  const [openHora, setOpenHora] = useState(false);
  const [customImageSelected, setCustomImageSelected] = useState(false);
  const [showImageDialog, setShowImageDialog] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      limpiarCampos();
    }, []),
  );

  const limpiarCampos = () => {
    setTitulo('');
    setFecha('');
    setHora('');
    setImagen('');
    setCustomImageSelected(false);
    setGratuito(true);
    setCosto('');
    setDescripcion('');
  };

  const agregarEvento = async () => {
    if (!titulo) {
      Toast.show({
        type: 'error',
        text1: 'Atención',
        text2: 'El campo Título es obligatorio.',
        visibilityTime: 3000,
      });
      return;
    }
    if (!fecha || !hora) {
      Toast.show({
        type: 'error',
        text1: 'Atención',
        text2: 'El campo Fecha y Hora es obligatorio.',
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
      fecha_hora: fecha + ' ' + hora,
      imagen: customImageSelected ? imagen : null,
      costo: parseFloat(costo), // Convertir a número decimal
      gratuito: gratuito,
      descripcion: descripcion,
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
    setShowImageDialog(false);
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
    setShowImageDialog(false);
  };

  const onDateChangeFecha = (selectedDate: Date) => {
    setOpenFecha(false);
    setDate(selectedDate);
    const formattedFecha = format(selectedDate, 'dd/MM/yyyy');
    setFecha(formattedFecha);
  };

  const onDateChangeHora = (selectedDate: Date) => {
    setOpenHora(false);
    const formattedHora = format(selectedDate, 'HH:mm');
    setHora(formattedHora);
  };

  const mostrarDialogoImagen = () => {
    setShowImageDialog(true);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Image
          source={customImageSelected ? {uri: imagen} : defaultImage}
          style={styles.imagenSeleccionada}
        />
        <TouchableOpacity style={styles.button} onPress={mostrarDialogoImagen}>
          <Text style={styles.buttonText}>Cargar Imagen</Text>
        </TouchableOpacity>

        <Dialog.Container visible={showImageDialog}>
          <Dialog.Title>Seleccionar Imagen</Dialog.Title>
          <Dialog.Description>
            <TouchableOpacity onPress={() => tomarFoto()}>
              <Text style={styles.dialogButton}>Tomar Foto</Text>
            </TouchableOpacity>
            <View style={{width: 5}}></View>
            <TouchableOpacity onPress={() => seleccionarImagen()}>
              <Text style={styles.dialogButton}>Seleccionar Imagen</Text>
            </TouchableOpacity>
          </Dialog.Description>
          <Dialog.Button
            label="Cancelar"
            onPress={() => setShowImageDialog(false)}
          />
        </Dialog.Container>
        <Text style={styles.label}>Título:</Text>
      <TextInput
        style={styles.input}
        value={titulo}
        onChangeText={text => setTitulo(text)}
      />

        <View style={styles.dateTimeContainer}>
          <View style={styles.dateTimeInput}>
            <Text style={styles.label}>Fecha:</Text>
            <TouchableOpacity onPress={() => setOpenFecha(true)}>
              <TextInput
                style={styles.input}
                onChangeText={text => setFecha(text)}
                value={fecha}
                placeholder="Selecciona la fecha"
                editable={false}
              />
            </TouchableOpacity>
            <DatePicker
              modal
              open={openFecha}
              date={date}
              mode="date"
              onConfirm={date => {
                onDateChangeFecha(date);
              }}
              onCancel={() => setOpenFecha(false)}
            />
          </View>
          <View style={{width: 10}}></View>
          <View style={styles.dateTimeInput}>
            <Text style={styles.label}>Hora:</Text>
            <TouchableOpacity onPress={() => setOpenHora(true)}>
              <TextInput
                style={styles.input}
                onChangeText={text => setHora(text)}
                value={hora}
                placeholder="Selecciona la hora"
                editable={false}
              />
            </TouchableOpacity>
            <DatePicker
              modal
              open={openHora}
              date={date}
              mode="time"
              onConfirm={date => {
                onDateChangeHora(date);
              }}
              onCancel={() => setOpenHora(false)}
            />
          </View>
        </View>
        <View style={styles.switchContainer}>
          <Text style={styles.label}>¿Gratuito?:</Text>
          <Switch
            trackColor={{false: '#767577', true: '#413c28'}}
            thumbColor={gratuito ? '#fbbc14' : '#f4f3f4'}
            ios_backgroundColor="#413c28"
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
        <Text style={styles.label}>Descripción:</Text>
        <TextInput
          style={styles.textArea}
          value={descripcion}
          onChangeText={text => setDescripcion(text)}
          multiline={true}
          numberOfLines={4}
        />
        <TouchableOpacity style={styles.buttonPrimary} onPress={agregarEvento}>
          <Text style={styles.buttonTextPrimary}>Agregar Evento</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonSecondary}
          onPress={() => tabNavigation.navigate('Eventos')}>
          <Text style={styles.buttonTextSecondary}>Listar Eventos</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
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
  textArea: {
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
  dateTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateTimeInput: {
    flex: 1,
  },
  dialogButton: {
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
    backgroundColor: '#F6ECEB',
    borderRadius: 20,
    padding: 10,
    textAlign: 'center',
  },
});
