import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CheckIn } from '../models/checkin.model';
import { Habitacion } from '../models/habitacion.model';
import { AppState } from '../store/app.reducer';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(
    private http: HttpClient,
    private store: Store<AppState>,
  ) { }

  getHabitaciones() {
    return this.http.get(`${environment.apiURL}/habitacions`).pipe(
      map((data: Habitacion[]) => {
        return data;
      })
    );
  }

  checkIn(habitacion: string, nombre: string, telefono: string, rfc: string, razon: string) {
    return this.http.post(`${environment.apiURL}/check-ins`, {
      habitacion,
      nombre,
      telefono,
      rfc,
      razon_social: razon
    }).pipe(
      map((data: CheckIn) => {
        return data;
      })
    );
  }
}
