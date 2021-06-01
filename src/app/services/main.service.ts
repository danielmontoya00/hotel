import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CheckIn } from '../models/checkin.model';
import { Habitacion } from '../models/habitacion.model';
import { AppState } from '../store/app.reducer';
import { editHabitacion } from '../store/actions/main.actions';
import { Reservacion } from '../models/reservacion.model';
import { Hotel } from '../models/hotel.model';

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

  getHotel() {
    console.log("HOTEL");
    return this.http.get(`${environment.apiURL}/sistemas`).pipe(
      map((data: Hotel[]) => {
        return data[0];
      })
    );
  }

  getcheckIn() {
    return this.http.get(`${environment.apiURL}/check-ins`).pipe(
      map((data: CheckIn[]) => {
        return data;
      })
    );
  }

  reservacion(nombre: string, celular: string, fecha: Date, habitaciones: number, total: number) {
    return this.http.post(`${environment.apiURL}/reservacions`, {
      nombre,
      celular,
      fecha,
      habitaciones,
      total
    }).pipe(
      map((data: Reservacion) => {
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

  editHabitacion(id: string, estado: string) {
    return this.http.put(`${environment.apiURL}/habitacions/${id}`, {
      estado
    }).pipe(
      map((data: Habitacion) => {
        return data;
      })
    )
  }

  editCheckin(id: string, checkout: Date) {
    return this.http.put(`${environment.apiURL}/check-ins/${id}`, {
      checkout
    }).pipe(
      map((data: CheckIn) => {
        return data;
      })
    )
  }


}
