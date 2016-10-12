import { Component } from '@angular/core';
import {ErrorService} from "./error/error.service";
@Component({
    selector: 'my-app',
    template: `
       <h1>{{title}}</h1>
       <ul class="nav nav-pills">
         <li role="presentation"><a routerLink="/dashboard">Dashboard</a></li>
         <li role="presentation"><a routerLink="/hooks">Hooks</a></li>
       </ul>
       <error-message></error-message>
       <router-outlet></router-outlet>
     `,
    providers: [ErrorService]
})

export class AppComponent {
    title = 'Antfarm Interface';

    constructor(
        private errorService: ErrorService
    ){};

}