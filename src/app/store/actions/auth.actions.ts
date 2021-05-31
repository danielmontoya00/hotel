import { createAction, props } from '@ngrx/store';
import { Usuario } from '../../models/usuario.model';

export const login = createAction(
  '[Auth] Login',
  props<{ email: string, password: string }>()
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ usuario: Usuario, token: string }>()
);

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: any }>()
);

export const cerrarSesion = createAction(
  '[Auth] Cerrar Sesion',
);

export const llenarSesion = createAction(
  '[Auth] Llenar Sesion',
  props<{
    user: Usuario
  }>()
);