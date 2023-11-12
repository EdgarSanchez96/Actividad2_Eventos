export interface IEvento {
  id: string;
  titulo: string;
  fecha_hora: string;
  imagen?: string | null; 
  gratuito: boolean;
  costo: number | null;
  descripcion: string;
}
