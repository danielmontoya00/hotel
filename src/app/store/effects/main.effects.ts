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
import { getcheckIn } from '../actions/main.actions';

@Injectable({
  providedIn: 'root'
})
export class AppEffects {

  habitaciones$ = createEffect(() => {
    return this.actions$.pipe(
        ofType(mainActions.habitaciones),
        switchMap(() => this.mainService.getHabitaciones().pipe(
           map(data => mainActions.habitacionesSuccess({ data })),
           catchError(error => of(mainActions.habitacionesFailure({ error }))))
        ),
    );
  });

  checkIn$ = createEffect(() => {
    return this.actions$.pipe(
        ofType(mainActions.checkIn),
        switchMap(({habitacion, nombre, telefono, rfc, razon}) =>
          this.mainService.checkIn(habitacion, nombre, telefono, rfc, razon).pipe(
            map(data => mainActions.checkInSuccess({ data })),
            tap(x => {
              this.store.dispatch(getcheckIn());
            }),
            catchError(error => of(mainActions.checkInFailure({ error }))))
          ),
    );
  });

  getCheckIns$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(mainActions.getcheckIn),
        switchMap(() =>
          this.mainService.getcheckIn().pipe(
            map(data => mainActions.getcheckInSuccess({ data })),
            catchError(error => of(mainActions.getcheckInFailure({ error }))))
          ),
    );
  });

  editHabitacion$ = createEffect(() => {
    return this.actions$.pipe(
        ofType(mainActions.editHabitacion),
        switchMap(({id, estado}) =>
          this.mainService.editHabitacion(id, estado).pipe(
            map(data => mainActions.editHabitacionSuccess({ data })),
            tap(x => {
              this.store.dispatch(mainActions.habitaciones());
            }),
            catchError(error => of(mainActions.editHabitacionFailure({ error }))))
          ),
    );
  });

  editCheckin$ = createEffect(() => {
    return this.actions$.pipe(
        ofType(mainActions.editCheckin),
        switchMap(({id, checkout}) =>
          this.mainService.editCheckin(id, checkout).pipe(
            map(data => mainActions.editCheckinSuccess({ data })),
            tap((x) => {
              this.store.dispatch(mainActions.getcheckIn());
            }),
            catchError(error => of(mainActions.editCheckinFailure({ error }))))
          ),
    );
  });


  reservacion$ = createEffect(() => {
    return this.actions$.pipe(
        ofType(mainActions.reservacion),
       switchMap(({ nombre, celular, fecha, habitaciones, total}) =>
          this.mainService.reservacion(nombre, celular, fecha, habitaciones, total).pipe(
            map(data => mainActions.reservacionSuccess({ data })),
            catchError(error => of(mainActions.reservacionFailure({ error }))))
          ),
    );
  });

  getHotel$ = createEffect(() => {
    return this.actions$.pipe(
        ofType(mainActions.hotel),
        switchMap(() =>
          this.mainService.getHotel().pipe(
            map(data => mainActions.hotelSuccess({ data })),
            catchError(error => of(mainActions.hotelFailure({ error }))))
          ),
    );
  });

  insumo$ = createEffect(() => {
    return this.actions$.pipe(
        ofType(mainActions.insumos),
        switchMap(() =>
          this.mainService.getInsumos().pipe(
            map(data => mainActions.insumosSuccess({ data })),
            catchError(error => of(mainActions.insumosFailure({ error }))))
          ),
    );
  });


  crearInsumo$ = createEffect(() => {
    return this.actions$.pipe(
        ofType(mainActions.crearInsumo),
        switchMap(({ nombre, tipo, inventario }) =>
          this.mainService.crearInsumo(nombre, tipo, inventario).pipe(
            map(data => mainActions.crearInsumoSuccess({ data })),
            tap(x => {
              this.store.dispatch(mainActions.insumos());
            }),
            catchError(error => of(mainActions.crearInsumoFailure({ error }))))
          ),
    );
  });


  editInsumo$ = createEffect(() => {
    return this.actions$.pipe(
        ofType(mainActions.editInsumo),
        switchMap(({id, tipo, nombre, inventario}) =>
          this.mainService.editInsumo(id, nombre, tipo, inventario).pipe(
            map(data => mainActions.editInsumoSuccess({ data })),
            tap(x => {
              this.store.dispatch(mainActions.insumos())
            }),
            catchError(error => of(mainActions.editInsumoFailure({ error }))))
          ),
    );
  });

  editHotel$ = createEffect(() => {
    return this.actions$.pipe(
        ofType(mainActions.editHotel),
        switchMap(({id, margen_ganancia, tarifa_base}) =>
          this.mainService.editHotel(id, margen_ganancia, tarifa_base).pipe(
            map(data => mainActions.editHotelSuccess({ data })),
            tap(x => {
              this.store.dispatch(mainActions.hotel());
            }),
            catchError(error => of(mainActions.editHotelFailure({ error }))))
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
