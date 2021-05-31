import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { cerrarSesion } from './store/actions/auth.actions';
import { habitaciones } from './store/actions/main.actions';
import { AppState } from './store/app.reducer';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Inicio', url: '/home', icon: 'home' },
    { title: 'Rentas y Reservaciones', url: '/rentas', icon: 'list' },
    { title: 'Usuarios', url: '/usuarios', icon: 'people' },
    { title: 'Insumos e Inventarios', url: '/inventario', icon: 'receipt' },
    { title: 'Configuración', url: '/config', icon: 'settings' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor(
    private store: Store<AppState>
  ) {
    this.store.dispatch(habitaciones());
  }

  ionViewWillEnter() {
    console.log("ION VIEW")
  }

  cerrarSesion() {
    this.store.dispatch(cerrarSesion())
  }
}
