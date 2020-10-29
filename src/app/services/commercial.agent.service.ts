import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { CommercialAgent } from '../models/commercial-agent';
import { Global } from './global';

@Injectable()
export class CommercialAgentService{
    public url: string;

    constructor(
        public _http: HttpClient
    ){
        this.url = Global.url;
    }
    
    createCommercialAgent(commercial_agent: CommercialAgent): Observable<any>{
        let params = JSON.stringify(commercial_agent);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post(this.url + "create-commercial-agent/", params, {headers: headers});
    }

    getCommercialAgent(id): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(this.url + "commercial-agents/" + id, {headers: headers});
    }

    getCommercialAgents(): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(this.url + "commercial-agents/", {headers: headers});
    }

    deleteCommercialAgent(id): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.delete(this.url + "commercial-agent/" + id, {headers: headers});
    }

    updateCommercialAgent(commercial_agent: CommercialAgent): Observable<any>{
        let params = JSON.stringify(commercial_agent);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.put(this.url + "commercial-agent/" + commercial_agent._id, params, {headers: headers});
    }
}