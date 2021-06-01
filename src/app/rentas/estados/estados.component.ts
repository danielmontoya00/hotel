import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Habitacion } from 'src/app/models/habitacion.model';
import { AppState } from 'src/app/store/app.reducer';
import { habitaciones } from '../../store/actions/main.actions';

@Component({
  selector: 'app-estados',
  templateUrl: './estados.component.html',
  styleUrls: ['./estados.component.scss'],
})
export class EstadosComponent implements OnInit {
  habitaciones: Habitacion[];

  constructor(
    private store: Store<AppState>,
  ) {

  }

  ngOnInit() {}

  ionViewWillEnter() {
    this.store.select('mainReducer').subscribe((x) => {
      this.habitaciones = x.habitaciones;
    });

    this.store.dispatch(habitaciones());
  }

}
