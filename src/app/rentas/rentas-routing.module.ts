import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CheckInComponent } from './check-in/check-in.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { EstadosComponent } from './estados/estados.component';
import { NavigationComponent } from './navigation/navigation.component';

import { RentasPage } from './rentas.page';
import { ReservacionComponent } from './reservacion/reservacion.component';

const routes: Routes = [
  {
    path: '',
    component: RentasPage,
    children: [
      { path: '', redirectTo: 'navigation', pathMatch: 'full' },
      {
        path: 'navigation',
        component: NavigationComponent
      },
      {
        path: 'checkin',
        component: CheckInComponent
      },
      {
        path: 'checkout',
        component: CheckOutComponent
      },
      {
        path: 'estados',
        component: EstadosComponent
      },
      {
        path: 'reservacion',
        component: ReservacionComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RentasPageRoutingModule {}
