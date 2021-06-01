import { Habitacion } from './habitacion.model';
export class CheckIn {
    id: string;
    nombre: string;
    telefono: string;
    factura: boolean;
    rfc: string;
    razon_social: string;
    checkout: Date;
    habitacion: Habitacion;
}
