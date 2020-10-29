import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Fair } from '../models/fair';
import { Global } from './global';

@Injectable()
export class FairService{
    public url: string;

    constructor(
        public _http: HttpClient
    ){
        this.url = Global.url;
    }

    getContact(id): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(this.url + "fair/" + id, {headers: headers});
    }
}