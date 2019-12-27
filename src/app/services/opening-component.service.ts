import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {OpeningComponentDTO} from '../clases/openingcomponents/opening-component-dto';
import {AppConfigurationService} from './app-configuration.service';
import {OpeningElement} from '../clases/models/datofuente/opening-element';
import {OpeningElementList} from '../clases/models/datofuente/opening-element-list';

@Injectable({
  providedIn: 'root'
})
export class OpeningComponentService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    }),

  };
  constructor(private http: HttpClient,
              private appConfigurationService : AppConfigurationService) { }

  getOpeningComponent(): Observable<OpeningComponentDTO>  {
    let uri = this.appConfigurationService.getEndPoint() + 'datofuente/openings';
    let retorno = this.http.get<OpeningComponentDTO>(uri, this.httpOptions); // Retorna un Observable

    return retorno;
  }

  /*Funciona perfectamente*/
  postComponent(listaPost : OpeningElementList): Observable<boolean>  {
    let uri = this.appConfigurationService.getEndPoint() + 'datofuente/components';
    let retorno = this.http.post<boolean>(uri,
                                          listaPost,
                                          this.httpOptions

    ); // Retorna un Observable

    return retorno;

  }

  generaExcelOk(listaPost : OpeningElementList): Observable<any>  {
    let uri = this.appConfigurationService.getEndPoint() + 'datofuente/excel';
    let retorno = this.http.post( uri,
                                  listaPost,
                          {responseType: 'arraybuffer',headers:{'Content-Type':  'application/json'}}
    );

    return retorno;
  }

}
