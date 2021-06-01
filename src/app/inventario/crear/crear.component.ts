import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { crearInsumo } from 'src/app/store/actions/main.actions';
import { AppState } from 'src/app/store/app.reducer';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.scss'],
})
export class CrearComponent implements OnInit {

  insumoForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private router: Router
  ) {
    this.insumoForm = this.fb.group({
      nombre: ['', Validators.required],
      tipo: ['', Validators.required],
      inventario: ['', Validators.required],
    })
  }

  onSubmit() {
    if (this.insumoForm.valid) {
      // Ejecutar la accion de logear
      this.store.dispatch(crearInsumo({
        nombre: this.insumoForm.value.nombre,
        tipo: this.insumoForm.value.tipo,
        inventario: this.insumoForm.value.inventario
      }));

      this.insumoForm.reset();

      this.router.navigate(['/inventario', 'lista'])

    } else { // caso contrario
      // Marcar todos los inputs como marcados para que aparezca error
      for (const i in this.insumoForm.controls) {
        this.insumoForm.controls[i].setValue(this.insumoForm.controls[i].value);
        this.insumoForm.controls[i].markAsTouched();
      }
    }
  }

  ngOnInit() {}

}
