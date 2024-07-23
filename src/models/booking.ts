export interface Booking {
  id: number;
  utente: string;
  auto: string;
  dataInizio: Date;
  dataFine: Date;
  status?: string;
  costoTotale?: number;
  note?: string;
}