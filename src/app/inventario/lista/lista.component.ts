import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Insumo } from 'src/app/models/insumo.model';
import { insumos } from 'src/app/store/actions/main.actions';
import { AppState } from 'src/app/store/app.reducer';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss'],
})
export class ListaComponent implements OnInit {

  insumos: Insumo[];

  constructor(
    private store: Store<AppState>
  ) { }

  ionViewWillEnter() {
    this.store.select('mainReducer').subscribe(x => {
      this.insumos = x.insumos;
    })

    this.store.dispatch(insumos());
  }

  ngOnInit() {}

}
