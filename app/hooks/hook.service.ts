import { Injectable, OnInit, NgZone }    from '@angular/core';
import { Headers, Http, URLSearchParams } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Hook } from './hook';
import {HookInterface} from "./hook-interface";

@Injectable()
export class HookService {

    private host = "http://localhost:8081";
    private hooks_path = '/hooks';  // URL to web api

    private hooksCache: Hook[];

    constructor(private http: Http) { }

    getHooks(): Promise<Hook[]> {
        return this.http.get(this.host + this.hooks_path)
            .toPromise()
            .then(response => response.json() as Hook[])
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

    // protected findHook(hook) {
    //     return hook.id === 'cherries';
    // }

    getHook(id: string): Promise<Hook> {
        return this.getHooks()
            .then((hooks) => {
                return hooks.find((hook, index, hooks) => {
                    return hook.id == id;
                });
            });
    }

    getHookInterface(interface_path: string): Promise<HookInterface> {
        return this.http.get(this.host + interface_path)
            .toPromise()
            .then(response => response.json() as HookInterface)
            .catch(this.handleError);
    }

    /**
     * Make hook HTTP request.
     * @param hookInterface
     */
    makeRequest(hookInterface: HookInterface, hook: Hook): Promise<string> {
        let fields = hookInterface.fields;

        let params: URLSearchParams = new URLSearchParams();
        fields.forEach(function(field){
            if (field.value) {
                params.set(field.id, field.value);
            }
        });

        if(hook.method === "get"){
            return this.http.get(this.host + hook.path, {search: params})
                .toPromise()
                .then(response => response.json())
                .catch(this.handleError);
        } else if (hook.method === "post"){
            return this.http.post(this.host + hook.path, {search: params})
                .toPromise()
                .then(response => response.json())
                .catch(this.handleError);
        } else {
            throw "Unsupported HTTP method. " + hook.method.toString()
        }

    }

}
