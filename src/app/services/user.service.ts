import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { User } from '../models/user';
import { Global } from './global';

@Injectable()
export class UserService{
    public url: string;

    constructor(
        public _http: HttpClient
    ){
        this.url = Global.url;
    }

    createUser(user: User): Observable<any>{
        let params = JSON.stringify(user);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post(this.url + "create-user", params, {headers: headers});
    }

    getUser(id): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(this.url + "user/" + id, {headers: headers});
    }

    getUsers(): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(this.url + "users", {headers: headers});
    }

    deleteUser(id): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        console.log(headers);
        return this._http.delete(this.url + "user/" + id, {headers: headers});
    }

    updateUser(user: User): Observable<any>{
        let params = JSON.stringify(user);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.put(this.url + "user/" + user._id, params, {headers: headers});
    }
}