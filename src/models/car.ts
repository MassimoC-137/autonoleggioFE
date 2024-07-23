export interface Car {
    id: number;
    modello: string;
    marca: string;
    anno: number;
    descrizione: string;
    colore?: string;
    targa?: string; 
    disponibilita?: boolean; 
    prezzoGiornaliero?: number; 
  }