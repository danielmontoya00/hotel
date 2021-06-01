import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Insumo } from 'src/app/models/insumo.model';
import { crearInsumo, editInsumo, insumos } from 'src/app/store/actions/main.actions';
import { AppState } from 'src/app/store/app.reducer';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.scss'],
})
export class EditarComponent implements OnInit {

  insumoForm: FormGroup;

  insumo: Insumo;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.insumoForm = this.fb.group({
      nombre: ['', Validators.required],
      tipo: ['', Validators.required],
      inventario: ['', Validators.required],
    })
  }

  ionViewWillEnter() {
    this.store.select('mainReducer').subscribe(x => {
      this.insumo = x.insumos.find((x) => x.id === this.route.snapshot.paramMap.get('id'));

      if(this.insumo !== undefined) {
        this.insumoForm.patchValue({
          nombre: this.insumo.nombre,
          tipo: this.insumo.tipo,
          inventario: this.insumo.inventario
        });
      }
    });

    this.store.dispatch(insumos());
  }

  onSubmit() {
    if (this.insumoForm.valid) {
      // Ejecutar la accion de logear
      this.store.dispatch(editInsumo({
        id: this.insumo.id,
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
