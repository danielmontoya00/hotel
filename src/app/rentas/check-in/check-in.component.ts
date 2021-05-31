import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Habitacion } from 'src/app/models/habitacion.model';
import { AppState } from 'src/app/store/app.reducer';
import { checkIn } from '../../store/actions/main.actions';

@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.component.html',
  styleUrls: ['./check-in.component.scss'],
})
export class CheckInComponent implements OnInit {

  habitaciones: Habitacion[];
  habitacionSelected: Habitacion;

  checkInForm: FormGroup;

  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder
  ) {
    this.store.select('mainReducer').subscribe((x) => {
      this.habitaciones = x.habitaciones;
    });

    this.checkInForm = this.fb.group({
      habitacion: ['', Validators.required],
      nombre: ['', Validators.required],
      telefono: ['', Validators.required],
      rfc: ['', Validators.required],
      razon_social: ['', Validators.required],
    })
  }

  ngOnInit() {}


  selectHabitacion(habitacion: Habitacion) {
    this.habitacionSelected = habitacion;

    this.checkInForm.patchValue({
      habitacion: this.habitacionSelected.id
    })
  }

  onSubmit() {
    console.log(this.checkInForm);
    // Si la forma es valida
    if (this.checkInForm.valid) {
      // Ejecutar la accion de logear
      this.store.dispatch(checkIn({
        habitacion: this.checkInForm.value.habitacion,
        nombre: this.checkInForm.value.nombre,
        razon: this.checkInForm.value.razon_social,
        rfc: this.checkInForm.value.rfc,
        telefono: this.checkInForm.value.telefono
      }));
    } else { // caso contrario
      // Marcar todos los inputs como marcados para que aparezca error
      for (const i in this.checkInForm.controls) {
        this.checkInForm.controls[i].setValue(this.checkInForm.controls[i].value);
        this.checkInForm.controls[i].markAsTouched();
      }
    }
  }


}
