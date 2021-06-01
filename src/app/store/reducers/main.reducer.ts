import { Action, createReducer, on, State } from '@ngrx/store';
import { Habitacion } from 'src/app/models/habitacion.model';
import * as appActions from '../actions/main.actions';
import { CheckIn } from '../../models/checkin.model';
import { Hotel } from 'src/app/models/hotel.model';
import { Insumo } from 'src/app/models/insumo.model';


export interface MainState {
  cargando: boolean;
  error: any;
  habitaciones: Habitacion[];
  checkIns: CheckIn[];
  hotel: Hotel;
  insumos: Insumo[]
}

const initialState: MainState = {
  cargando: false,
  error: null,
  habitaciones: [],
  checkIns: [],
  hotel: null,
  insumos: []
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

  on(appActions.getcheckIn, (state) => ({
    ...state,
    cargando: true,
    error: null,
  })),
  on(appActions.getcheckInSuccess, (state, { data }) => ({
    ...state,
    cargando: false,
    checkIns: [ ...data ]
  })),
  on(appActions.getcheckInFailure, (state, { error }) => ({
    ...state,
    cargando: false,
    error: { ...error }
  })),

  on(appActions.hotel, (state) => ({
    ...state,
    cargando: true,
    error: null,
  })),
  on(appActions.hotelSuccess, (state, { data }) => ({
    ...state,
    cargando: false,
    hotel: data
  })),
  on(appActions.hotelFailure, (state, { error }) => ({
    ...state,
    cargando: false,
    error: { ...error }
  })),

  on(appActions.insumos, (state) => ({
    ...state,
    cargando: true,
    error: null,
  })),
  on(appActions.insumosSuccess, (state, { data }) => ({
    ...state,
    cargando: false,
    insumos: [ ...data ]
  })),
  on(appActions.insumosFailure, (state, { error }) => ({
    ...state,
    cargando: false,
    error: { ...error }
  })),
);

export function mainreducer(state, action) {
  return reducer(state, action);
}
