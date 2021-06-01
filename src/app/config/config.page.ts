import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.reducer';
import { Hotel } from '../models/hotel.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { editHotel } from '../store/actions/main.actions';

@Component({
  selector: 'app-config',
  templateUrl: './config.page.html',
  styleUrls: ['./config.page.scss'],
})
export class ConfigPage implements OnInit {

  hotel: Hotel;
  hotelForm: FormGroup;

  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder,
  ) {

    this.hotelForm = this.fb.group({
      tarifa_base: ['', Validators.required],
      margen_ganancia: ['', Validators.required],
    })
  }

  ionViewWillEnter() {
    this.store.select('mainReducer').subscribe((x) => {
      this.hotel = x.hotel;

      if(this.hotel) {
        this.hotelForm.patchValue({
          tarifa_base: this.hotel.tarifa_base,
          margen_ganancia: this.hotel.margen_ganancia
        })
      }
    })
  }

  onSubmit() {
    console.log(this.hotelForm)
    if (this.hotelForm.valid) {
      // Ejecutar la accion de logear
      // this.store.dispatch(editInsumo({
      //   id: this.insumo.id,
      //   nombre: this.insumoForm.value.nombre,
      //   tipo: this.insumoForm.value.tipo,
      //   inventario: this.insumoForm.value.inventario
      // }));

      this.store.dispatch(editHotel({
        id: this.hotel.id,
        margen_ganancia: this.hotelForm.value.margen_ganancia,
        tarifa_base: this.hotelForm.value.tarifa_base
      }))


    } else { // caso contrario
      // Marcar todos los inputs como marcados para que aparezca error
      for (const i in this.hotelForm.controls) {
        this.hotelForm.controls[i].setValue(this.hotelForm.controls[i].value);
        this.hotelForm.controls[i].markAsTouched();
      }
    }
  }

  ngOnInit() {
  }

}
