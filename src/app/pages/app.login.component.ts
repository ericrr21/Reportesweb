import { Component } from '@angular/core';

import {UserLoggedService} from '../demo/service/user-logged.service';

@Component({
  selector: 'app-login',
  templateUrl: './app.login.component.html',
})
export class AppLoginComponent {
    nombre = '';

    constructor(private userLoggedService: UserLoggedService ) {
    }

    updateUser() {
        this.userLoggedService.usuarioLogeado = this.nombre;
    }
}
