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

}
