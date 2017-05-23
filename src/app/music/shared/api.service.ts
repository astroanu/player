import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class ApiService {

  clientId = '00ec449df7a13b373728a473868ba7fc'

    constructor(
      private http: Http
    ) {}

    get(url, attachClientId?) {
      let u;
      attachClientId ? u = this.prepareUrl(url) : u = url;
      return this.http.get(u);
    }

    prepareUrl(url) {
      //Attach client id to stream url
      return `${url}?client_id=${this.clientId}`
    }

}
