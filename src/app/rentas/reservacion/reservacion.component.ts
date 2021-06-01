import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { reservacion } from '../../store/actions/main.actions';

@Component({
  selector: 'app-reservacion',
  templateUrl: './reservacion.component.html',
  styleUrls: ['./reservacion.component.scss'],
})
export class ReservacionComponent implements OnInit {

  reservacionForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
  ) {
    this.reservacionForm = this.fb.group({
      nombre: ['', Validators.required],
      celular: ['', Validators.required],
      fecha: ['', Validators.required],
      habitaciones: ['', Validators.required],
      total: ['', Validators.required],
    })
  }

  ngOnInit() {}

  onSubmit() {
    console.log(this.reservacionForm)
    // Si la forma es valida
    if (this.reservacionForm.valid) {
      // Ejecutar la accion de logear
      this.store.dispatch(reservacion({
        nombre: this.reservacionForm.value.nombre,
        celular: this.reservacionForm.value.celular,
        fecha: this.reservacionForm.value.fecha,
        habitaciones: this.reservacionForm.value.habitaciones,
        total: this.reservacionForm.value.total
      }));

      this.reservacionForm.reset();

    } else { // caso contrario
      // Marcar todos los inputs como marcados para que aparezca error
      for (const i in this.reservacionForm.controls) {
        this.reservacionForm.controls[i].setValue(this.reservacionForm.controls[i].value);
        this.reservacionForm.controls[i].markAsTouched();
      }
    }
  }

}
