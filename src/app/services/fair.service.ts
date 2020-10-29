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

    createFair(fair: Fair): Observable<any>{
        let params = JSON.stringify(fair);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post(this.url + "create-fair", params, {headers: headers});
    }

    getFair(id): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(this.url + "fair/" + id, {headers: headers});
    }

    getFairs(): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(this.url + "fairs", {headers: headers});
    }

    deleteFair(id): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.delete(this.url + "fair/" + id, {headers: headers});
    }

    updateFair(fair: Fair): Observable<any>{
        let params = JSON.stringify(fair);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.put(this.url + "fair/" + fair._id, params, {headers: headers});
    }
}

