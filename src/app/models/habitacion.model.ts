export class Habitacion {
    id: string;
    numero: number;
    numero_personas: number;
    piso: number;
    tipo: 'individual' | 'doble';
    estado: 'reservada' | 'limpia' | 'ocupada' | 'sucia';
}