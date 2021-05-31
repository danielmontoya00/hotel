import { createAction, props } from '@ngrx/store';
import { CheckIn } from 'src/app/models/checkin.model';
import { Habitacion } from 'src/app/models/habitacion.model';

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