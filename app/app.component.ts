import { Component } from '@angular/core';
@Component({
    selector: 'my-app',
    template: `
       <h1>{{title}}</h1>
       <ul class="nav nav-pills">
         <li role="presentation"><a routerLink="/dashboard">Dashboard</a></li>
         <li role="presentation"><a routerLink="/hooks">Hooks</a></li>
       </ul>
       <router-outlet></router-outlet>
     `
})

export class AppComponent {
    title = 'Antfarm Interface';
}