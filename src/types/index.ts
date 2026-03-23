export interface OperacionDiaria {
  id: number;
  fecha: string | Date;
  habitacionesVendidas: number;
  adrDiario: number;
  nuevasReservas: number;
  cancelaciones: number;
  origenPredominante?: string | null;
  eventoAtractor?: string | null;
  hotelId: number;
  createdAt?: string | Date;
}

export interface DashboardFormData {
  occ: string;
  adr: string;
  newRes: string;
  cancels: string;
  origin: string;
  pacingEvent: string;
}

export interface HotelInfo {
  name: string;
  rooms: number;
}
