import { ActionReducerMap } from '@ngrx/store';
import { authreducer, AuthState } from './reducers/auth.reducer';
import { mainreducer, MainState } from './reducers/main.reducer';


export interface AppState {
  authReducer: AuthState;
  mainReducer: MainState;
}

export const appReducers: ActionReducerMap<AppState> = {
  authReducer: authreducer,
  mainReducer: mainreducer,
};