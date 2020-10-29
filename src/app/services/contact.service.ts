import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Contact } from '../models/contact';
import { Global } from './global';

@Injectable()
export class ContactService{
    public url: string;

    constructor(
        public _http: HttpClient
    ){
        this.url = Global.url;
    }

    createContact(contact: Contact): Observable<any>{
        let params = JSON.stringify(contact);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post(this.url + "create-contact/", params, {headers: headers});
    }

    getContact(id): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(this.url + "contact/" + id, {headers: headers});
    }

    getContacts(): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(this.url + "contacts/", {headers: headers});
    }
    
    deleteContact(id): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.delete(this.url + "contact/" + id, {headers: headers});
    }

    updateContact(contact: Contact): Observable<any>{
        let params = JSON.stringify(contact);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.put(this.url + "contact/" + contact._id, params, {headers: headers});
    }
}