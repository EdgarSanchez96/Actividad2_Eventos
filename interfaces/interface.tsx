export interface IEvento {
  id: string;
  titulo: string;
  fecha: string;
  imagen?: string | null; 
  gratuito: boolean;
  costo: number | null;
}
