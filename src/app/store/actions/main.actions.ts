import { createAction, props } from '@ngrx/store';
import { CheckIn } from 'src/app/models/checkin.model';
import { Habitacion } from 'src/app/models/habitacion.model';
import { Insumo } from 'src/app/models/insumo.model';
import { Reservacion } from 'src/app/models/reservacion.model';
import { Hotel } from '../../models/hotel.model';

export const habitaciones = createAction(
  '[Main] Habitaciones'
);

export const habitacionesSuccess = createAction(
  '[Main] Habitaciones Success',
  props<{ data: Habitacion[] }>()
);

export const habitacionesFailure = createAction(
  '[Main] Habitaciones Failure',
  props<{ error: any }>()
);

export const getcheckIn = createAction(
  '[Main] Get CheckIn'
);

export const getcheckInSuccess = createAction(
  '[Main] Get CheckIn Success',
  props<{ data: CheckIn[] }>()
);

export const getcheckInFailure = createAction(
  '[Main] Get CheckIn Failure',
  props<{ error: any }>()
);

export const checkIn = createAction(
  '[Main] CheckIn',
  props<{ habitacion: string, nombre: string, telefono: string, rfc: string, razon: string }>()
);

export const checkInSuccess = createAction(
  '[Main] CheckIn Success',
  props<{ data: CheckIn }>()
);

export const checkInFailure = createAction(
  '[Main] CheckIn Failure',
  props<{ error: any }>()
);


export const editHabitacion = createAction(
  '[Main] editHabitacion',
  props<{ id: string, estado: string }>()
);

export const editHabitacionSuccess = createAction(
  '[Main] editHabitacion Success',
  props<{ data: Habitacion }>()
);

export const editHabitacionFailure = createAction(
  '[Main] editHabitacion Failure',
  props<{ error: any }>()
);

export const editCheckin = createAction(
  '[Main] editCheckin',
  props<{ id: string, checkout: Date }>()
);

export const editCheckinSuccess = createAction(
  '[Main] editCheckin Success',
  props<{ data: CheckIn }>()
);

export const editCheckinFailure = createAction(
  '[Main] editCheckin Failure',
  props<{ error: any }>()
);


export const reservacion = createAction(
  '[Main] reservacion',
  props<{ nombre: string, celular: string, fecha: Date, habitaciones: number, total: number }>()
);

export const reservacionSuccess = createAction(
  '[Main] reservacion Success',
  props<{ data: Reservacion }>()
);

export const reservacionFailure = createAction(
  '[Main] reservacion Failure',
  props<{ error: any }>()
);


export const hotel = createAction(
  '[Main] Hotel'
);

export const hotelSuccess = createAction(
  '[Main] Hotel Success',
  props<{ data: Hotel }>()
);

export const hotelFailure = createAction(
  '[Main] Hotel Failure',
  props<{ error: any }>()
);

export const insumos = createAction(
  '[Main] Insumos'
);

export const insumosSuccess = createAction(
  '[Main] Insumos Success',
  props<{ data: Insumo[] }>()
);

export const insumosFailure = createAction(
  '[Main] Insumos Failure',
  props<{ error: any }>()
);

export const crearInsumo = createAction(
  '[Main] crearInsumo',
  props<{ nombre: string, tipo: string, inventario: number }>()
);

export const crearInsumoSuccess = createAction(
  '[Main] crearInsumo Success',
  props<{ data: Insumo }>()
);

export const crearInsumoFailure = createAction(
  '[Main] crearInsumo Failure',
  props<{ error: any }>()
);

export const editInsumo = createAction(
  '[Main] editInsumo',
  props<{ id: string, nombre: string, tipo: string, inventario: number }>()
);

export const editInsumoSuccess = createAction(
  '[Main] editInsumo Success',
  props<{ data: Insumo }>()
);

export const editInsumoFailure = createAction(
  '[Main] editInsumo Failure',
  props<{ error: any }>()
);
