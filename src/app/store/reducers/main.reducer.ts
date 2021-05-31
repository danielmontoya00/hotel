import { Action, createReducer, on, State } from '@ngrx/store';
import { Habitacion } from 'src/app/models/habitacion.model';
import * as appActions from '../actions/main.actions';


export interface MainState {
  cargando: boolean;
  error: any;
  habitaciones: Habitacion[];
}

const initialState: MainState = {
  cargando: false,
  error: null,
  habitaciones: []
};

export const reducer = createReducer(
  initialState,
  on(appActions.habitaciones, (state) => ({
    ...state,
    cargando: true,
    error: null,
  })),
  on(appActions.habitacionesSuccess, (state, { data }) => ({
    ...state,
    cargando: false,
    habitaciones: [ ...data ]
  })),
  on(appActions.habitacionesFailure, (state, { error }) => ({
    ...state,
    cargando: false,
    error: { ...error }
  })),
);

export function mainreducer(state, action) {
  return reducer(state, action);
}
