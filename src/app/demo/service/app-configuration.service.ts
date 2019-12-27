import { Injectable } from '@angular/core';

// const endpoint = 'http://us-smy-mxcapp01:8080/';
 const endpoint = 'http://localhost:8080/';

@Injectable({
  providedIn: 'root'
})
export class AppConfigurationService {

  constructor() { }

    getEndPoint() {
        return endpoint;
    }
}
