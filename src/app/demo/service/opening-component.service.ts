import { Injectable } from '@angular/core';
import {OpeningElementList} from '../../clases/models/datofuente/opening-element-list';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AppConfigurationService} from './app-configuration.service';
import {OpeningComponentDTO} from '../../clases/openingcomponents/opening-component-dto';

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
                private appConfigurationService: AppConfigurationService) { }

    getOpeningComponent(): Observable<OpeningComponentDTO>  {
        const uri = this.appConfigurationService.getEndPoint() + 'datofuente/openings';
        const retorno = this.http.get<OpeningComponentDTO>(uri, this.httpOptions); // Retorna un Observable

        return retorno;
    }

    /*Funciona perfectamente*/
    postComponent(listaPost: OpeningElementList): Observable<boolean>  {
        const uri = this.appConfigurationService.getEndPoint() + 'datofuente/components';
        const retorno = this.http.post<boolean>(uri,
            listaPost,
            this.httpOptions

        ); // Retorna un Observable

        return retorno;

    }

    generaExcelOk(listaPost : OpeningElementList): Observable<any>  {
        const uri = this.appConfigurationService.getEndPoint() + 'datofuente/excel';
        const retorno = this.http.post( uri,
            listaPost,
            {responseType: 'arraybuffer', headers: {'Content-Type':  'application/json'}}
        );

        return retorno;
    }
}
