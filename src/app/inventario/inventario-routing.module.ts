import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CrearComponent } from './crear/crear.component';
import { EditarComponent } from './editar/editar.component';

import { InventarioPage } from './inventario.page';
import { ListaComponent } from './lista/lista.component';

const routes: Routes = [
  {
    path: '',
    component: InventarioPage,
    children: [
      { path: '', redirectTo: 'lista' },
      {
        path: 'crear',
        component: CrearComponent
      },
      {
        path: 'lista',
        component: ListaComponent
      },
      {
        path: 'editar/:id',
        component: EditarComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InventarioPageRoutingModule {}
