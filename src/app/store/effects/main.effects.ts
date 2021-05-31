import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from 'src/app/services/auth.service';
import * as mainActions from '../actions/main.actions';
import { map, catchError, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { Usuario } from 'src/app/models/usuario.model';
import { Router } from '@angular/router';
import { MainService } from 'src/app/services/main.service';

@Injectable({
  providedIn: 'root'
})
export class AppEffects {
  
  habitaciones$ = createEffect(() => {
    return this.actions$.pipe(
        ofType(mainActions.habitaciones),
        switchMap(() => {
          console.log('HABITACIONES')
          return this.mainService.getHabitaciones().pipe(
           map(data => mainActions.habitacionesSuccess({ data })),
           catchError(error => of(mainActions.habitacionesFailure({ error }))))

        }),
    );
  });

  checkIn$ = createEffect(() => {
    return this.actions$.pipe(
        ofType(mainActions.checkIn),
        switchMap(({habitacion, nombre, telefono, rfc, razon}) =>
          this.mainService.checkIn(habitacion, nombre, telefono, rfc, razon).pipe(
            map(data => mainActions.checkInSuccess({ data })),
            catchError(error => of(mainActions.checkInFailure({ error }))))
          ),
    );
  });

  constructor(
    private actions$: Actions,
    private mainService: MainService,
    private auth: AuthService,
    private store: Store<AppState>,
    private router: Router,
    // private appService: AppService
  ) { }
}
