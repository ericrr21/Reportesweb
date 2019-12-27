import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserLoggedService {
    private _usuarioLogeado = 'guest';

  constructor() { }

  get usuarioLogeado(): string {
      return this._usuarioLogeado;
  }

  set usuarioLogeado(value: string) {
      this._usuarioLogeado = value;
  }
}
