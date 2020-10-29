import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Login } from '../models/login';
import { Global } from './global';

@Injectable()
export class LoginService{
    public url: string;

    constructor(
        public _http: HttpClient
    ){
        this.url = Global.url;
    }

    userLogin(login: Login): Observable<any>{
        let params = JSON.stringify(login);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post(this.url + "user-login/", params, {headers: headers});
    }
}