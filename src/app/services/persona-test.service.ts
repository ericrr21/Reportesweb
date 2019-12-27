import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import { Observable, of } from 'rxjs';

import {Persona} from '../clases/persona/persona';

const endpoint = 'http://localhost:8080/persona/todas/?number=29&name=pepe';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  }),

};

@Injectable({
  providedIn: 'root'
})
export class PersonaTestService {

  constructor(private http: HttpClient) { }

  /*Funciona perfectamente*/
  public getPersonas(): Observable<Persona[]>  {

    return this.http.get<Persona[]>(endpoint, httpOptions);
  }

  /* Este funciona perfectamente*/
  public getPersonasObservable(): Observable<Persona[]> {
    let retorno: Observable<Persona[]>;
    retorno = this.http.get<Persona[]>(endpoint, httpOptions);
    return retorno;
  }

  /* Este funciona perfectamente*/
  getPersonasGenerico(): Observable<Persona[]>  {
    let retorno = this.http.get<Persona[]>(endpoint, httpOptions); // Retorna un Observable

    return retorno;
  }

}
