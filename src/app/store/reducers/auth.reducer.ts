import { Action, createReducer, on } from '@ngrx/store';
import { Usuario } from 'src/app/models/usuario.model';
import * as auth from '../actions/auth.actions';

export interface AuthState {
    usuario: Usuario;
    error: any;
    cargando: boolean;
}


const initialState: AuthState = {
  cargando: false,
  error: null,
  usuario: null
};

const reducer = createReducer(
  initialState,
  on(auth.login, (state) => ({
    ...state,
    cargando: true,
    error: null,
  })),
  on(auth.loginSuccess, (state, { usuario }) => ({
    ...state,
    cargando: false,
    usuario: { ...usuario }
  })),
  on(auth.loginFailure, (state, { error }) => ({
    ...state,
    cargando: false,
    error: { ...error }
  })),
  on(auth.cerrarSesion, (state) => ({
    ...initialState
  })),
  on(auth.llenarSesion, (state, { user }) => ({
    ...state,
    usuario: { ...user }
  })),
);

// export const authreducer = (state: AuthState | undefined, action: Action) => authReducer(state, action);
export function authreducer(state, action) {
    return reducer(state, action);
  }
