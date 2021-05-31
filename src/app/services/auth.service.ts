import { Injectable } from '@angular/core';
import { cerrarSesion, llenarSesion } from '../store/actions/auth.actions';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario.model';
import { AppState } from '../store/app.reducer';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  auth: boolean = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private store: Store<AppState>,
  ) {
    this.store.select('authReducer').subscribe((x) => this.auth = x.usuario ? true : false);
   }

   login(email: string, password: string) {
    return this.http.post(`${environment.apiURL}/auth/local`, { identifier: email, password }).pipe(
      map((res: { jwt: string, user: Usuario }) => ({
        usuario: res.user,
        token: res.jwt
      }))
    );
  }

  isAuth() {
    const token = localStorage.getItem('token');
    const usuario = localStorage.getItem('usuario');
    if (!token || !usuario) { // No tiene token
      this.logout();
      return false;
    }

    const helper = new JwtHelperService();
    const isExpired = helper.isTokenExpired(token);

    if (!isExpired) { // Si no está expirado el token
      if (!this.auth) {
        this.store.dispatch(llenarSesion({ user: this.getUsuario() }));
        // if (this.utilidadesService.getCarrito().length != 0) {
        //   this.store.dispatch(setCarrito({ cart: this.utilidadesService.getCarrito() }));
        // }
        // if (this.utilidadesService.getCard() != null) {
        //   this.store.dispatch(guardarTarjeta({
        //     number: this.utilidadesService.getCard().number,
        //     cvc: this.utilidadesService.getCard().cvc,
        //     exp_year: this.utilidadesService.getCard().exp_year,
        //     exp_month: this.utilidadesService.getCard().exp_month,
        //     name: this.utilidadesService.getCard().name
        //   }));
        // }
      }
      return true;
    }

    this.logout(); // Token expirado
    return false;
  }

  getUsuario() {
    let usuario = localStorage.getItem('usuario');
    if (!usuario) {
      this.logout();
      return null;
    }
    let usuarioObj: Usuario;
    usuarioObj = JSON.parse(usuario);
    usuario = Object.setPrototypeOf(usuario, Usuario.prototype);
    return usuarioObj;
  }

  getToken() {
    const token = localStorage.getItem('token');
    return token;
  }

  verificarNecesitaLogin() {
    const token = localStorage.getItem('token');
    const usuario = localStorage.getItem('usuario');
    if (token && usuario) {
      this.router.navigate(['home']);
      return false;
    }
    return true;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    this.router.navigate(['login']);
    this.store.dispatch(cerrarSesion()); // Limpia el store de Auth
  }
}
