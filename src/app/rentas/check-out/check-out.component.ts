import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Habitacion } from 'src/app/models/habitacion.model';
import { AppState } from 'src/app/store/app.reducer';
import { CheckIn } from '../../models/checkin.model';
import { editHabitacion, getcheckIn, editCheckin, checkIn } from '../../store/actions/main.actions';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss'],
})
export class CheckOutComponent implements OnInit {

  habitaciones: Habitacion[];
  checkIns: CheckIn[];

  constructor(
    private store: Store<AppState>,
    public alertController: AlertController
  ) {

  }

  ngOnInit() {}

  ionViewWillEnter() {
    this.store.select('mainReducer').subscribe((x) => {
      this.habitaciones = x.habitaciones;
      this.checkIns = x.checkIns;

      console.log(this.checkIns);
    });

    this.store.dispatch(getcheckIn());
  }

  async checkOut(checkin: CheckIn) {
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Confirmar',
        message: 'Confirmar checkout habitacion ' + checkin.habitacion.numero,
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
              console.log('Confirm Cancel: blah');
            }
          }, {
            text: 'Okay',
            handler: () => {
              console.log('Confirm Okay');

              this.store.dispatch(editCheckin({
                id: checkin.id,
                checkout: new Date()
              }))

              this.store.dispatch(editHabitacion({
                id: checkin.habitacion.id,
                estado: 'limpia'
              }))

            }
          }
        ]
      });

      await alert.present();
  }
}
