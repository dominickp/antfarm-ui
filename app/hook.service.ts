import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Hook } from './hook';
import { HEROES } from './mock-heroes';

@Injectable()
export class HookService {

    private heroesUrl = 'http://localhost:8081/hooks';  // URL to web api

    constructor(private http: Http) { }

    getHooks(): Promise<Hook[]> {
        return this.http.get(this.heroesUrl)
            .toPromise()
            .then(response => response.json() as Hook[])
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

    getHero(id: number): Promise<Hook> {
        return this.getHooks()
            .then(hooks => hooks.find(hook => hook.id === id));
    }

}
