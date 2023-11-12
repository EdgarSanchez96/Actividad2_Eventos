// utils/util.ts

import AsyncStorage from '@react-native-async-storage/async-storage';
import {IEvento} from '../interfaces/interface';

const EVENTOS_KEY = '../assets/eventos';

export const guardarEvento = async (evento: IEvento) => {
  try {
    const eventosGuardados = JSON.parse(
      (await AsyncStorage.getItem(EVENTOS_KEY)) || '[]',
    ) as IEvento[];

    eventosGuardados.push(evento);

    await AsyncStorage.setItem(EVENTOS_KEY, JSON.stringify(eventosGuardados));
  } catch (error) {
    console.error('Error al guardar el evento:', error);
  }
};

export const obtenerEventos = async (): Promise<IEvento[]> => {
  try {
    // Intenta cargar eventos desde AsyncStorage
    const eventosGuardados = await AsyncStorage.getItem(EVENTOS_KEY);

    if (eventosGuardados) {
      return JSON.parse(eventosGuardados) as IEvento[];
    }
    // return [];

    // Si no hay eventos en AsyncStorage, carga desde el archivo JSON
    const eventosDesdeJSON = require('../assets/eventos.json');
    return eventosDesdeJSON as IEvento[];
  } catch (error) {
    console.error('Error al obtener los eventos:', error);
    return [];
  }
};

export const limpiarEventos = async () => {
  try {
    await AsyncStorage.removeItem(EVENTOS_KEY);
  } catch (error) {
    throw new Error('Error al limpiar el almacenamiento de eventos.');
  }
};

export const guardarEventos = async (eventos: IEvento[]) => {
  try {
    // Guarda los eventos en el almacenamiento
    await AsyncStorage.setItem(EVENTOS_KEY, JSON.stringify(eventos));
  } catch (error) {
    console.error('Error al guardar los eventos:', error);
  }
};
