import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppState } from '../store/app.reducer';
import { login } from '../store/actions/auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  
  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    console.log('onSubmit', this.loginForm)
    // Si la forma es valida
    if (this.loginForm.valid) {
      // Ejecutar la accion de logear
      this.store.dispatch(login({
        email: this.loginForm.value.email,
        password: this.loginForm.value.password
      }));
    } else { // caso contrario
      // Marcar todos los inputs como marcados para que aparezca error
      for (const i in this.loginForm.controls) {
        this.loginForm.controls[i].setValue(this.loginForm.controls[i].value);
        this.loginForm.controls[i].markAsTouched();
      }
    }
  }

  ngOnInit() {
  }

}
