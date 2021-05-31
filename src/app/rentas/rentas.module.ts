import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RentasPageRoutingModule } from './rentas-routing.module';

import { RentasPage } from './rentas.page';
import { CheckInComponent } from './check-in/check-in.component';
import { EstadosComponent } from './estados/estados.component';
import { NavigationComponent } from './navigation/navigation.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { ReservacionComponent } from './reservacion/reservacion.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RentasPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [RentasPage, CheckInComponent, CheckOutComponent, EstadosComponent, NavigationComponent, ReservacionComponent]
})
export class RentasPageModule {}
