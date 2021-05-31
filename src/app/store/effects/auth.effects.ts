import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as auth from '../actions/auth.actions';

import { map, catchError, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { Usuario } from 'src/app/models/usuario.model';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthEffects {
    login$ = createEffect(() => {
        return this.actions$.pipe(
          ofType(auth.login),
          switchMap(({ email, password }) => this.authService.login(email, password).pipe(
            map(({ usuario, token }) => {
              localStorage.setItem('token', token);
              localStorage.setItem('usuario', JSON.stringify(usuario));
              this.router.navigate(["/home"], {
                replaceUrl: true
              });
              return auth.loginSuccess({ usuario, token })
            }),
            catchError((error) => {
              console.error(error);
              return of(auth.loginFailure({ error }));
            })
          )));
      });
    
      

  cerrarSesion$ = createEffect(() =>
    this.actions$.pipe(
      ofType(auth.cerrarSesion),
      tap(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('usuario');
        localStorage.removeItem('error');
        this.router.navigate(['login']);
      })
    ), { dispatch: false });

  

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) { }
}
