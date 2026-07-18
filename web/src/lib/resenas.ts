import raw from '../data/resenas.json';

export interface ResenaItem {
  autor: string;
  texto: string;
}

export interface ResenasData {
  google: {
    rating: number;
    cantidad: number;
    url: string;
  };
  resenas: ResenaItem[];
}

export const resenas: ResenasData = raw as ResenasData;
