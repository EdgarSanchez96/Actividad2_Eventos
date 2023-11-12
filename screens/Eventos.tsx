import {useFocusEffect} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useCallback, useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {IEvento} from '../interfaces/interface';
import {eliminarEvento, obtenerEventos} from '../utlils/util';
import Dialog from 'react-native-dialog';

interface Props {
  navigation: StackNavigationProp<any>;
  route: any;
}

interface PropsEvento {
  evento: any;
  navigation: StackNavigationProp<any>;
  actualizarEventos: () => void; 
}

const Evento: React.FC<PropsEvento> = ({
  evento,
  navigation,
  actualizarEventos,
}: PropsEvento) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleDelete = async () => {
    await eliminarEvento(evento.id);
    actualizarEventos();
    setShowDeleteDialog(false);
  };

  return (
    <TouchableOpacity
      style={styles.eventoCard}
      onPress={() => navigation.navigate('DetallesEvento', { evento })}>
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
        <Text style={styles.eventoFecha}>{evento.fecha_hora}</Text>
        {evento.gratuito ? (
          <Text style={styles.eventoGratuito}>Gratuito</Text>
        ) : (
          <Text style={styles.eventoPago}>De pago</Text>
        )}
      </View>
      <TouchableOpacity onPress={() => setShowDeleteDialog(true)}>
        <Icon name="times" size={55} color="#DB0000" />
      </TouchableOpacity>

      {/* Diálogo de confirmación para eliminar */}
      <Dialog.Container visible={showDeleteDialog}>
        <Dialog.Title>Eliminar Evento</Dialog.Title>
        <Dialog.Description>
          ¿Estás seguro de que deseas eliminar este evento?
        </Dialog.Description>
        <Dialog.Button
          label="Cancelar"
          onPress={() => setShowDeleteDialog(false)}
        />
        <Dialog.Button label="Eliminar" onPress={handleDelete} />
      </Dialog.Container>
    </TouchableOpacity>
  );
};


export default function Eventos({navigation}: Props) {
  const [eventos, setEventos] = useState<IEvento[]>([]);
  const [loading, setLoading] = useState(true);

  const obtenerEventosGuardados = async () => {
    try {
      const eventosGuardados = await obtenerEventos();
      setEventos(eventosGuardados);
    } catch (error) {
      console.error('Error al obtener eventos:', error);
    } finally {
      setLoading(false);
    }
  };

  // Función de actualización para cargar los eventos nuevamente
  const actualizarEventos = useCallback(() => {
    obtenerEventosGuardados();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      obtenerEventosGuardados();
    }, []),
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Cargando eventos...</Text>
      </View>
    );
  }

  if (eventos.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={{marginBottom: 10}}>No hay eventos disponibles</Text>
        <TouchableOpacity
          style={styles.buttonPrimary}
          onPress={() => navigation.navigate('NuevoEvento')}>
          <Text style={styles.buttonTextPrimary}>Agregar Evento</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={eventos}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <Evento
            evento={item}
            navigation={navigation}
            actualizarEventos={actualizarEventos}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  eventoCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  eventoImagen: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  eventoInfo: {
    flex: 1,
  },
  eventoTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  eventoFecha: {
    fontSize: 14,
    color: 'gray',
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
  buttonPrimary: {
    backgroundColor: '#fbbc14',
    padding: 10,
    borderRadius: 20,
  },
  buttonTextPrimary: {
    color: '#413c28',
    fontSize: 16,
    textAlign: 'center',
  },
});
