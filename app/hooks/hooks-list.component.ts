import { Component, Input} from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'my-heroes',
    template: `
      <h2>HEROES</h2>
      <div *ngIf="hero">
        <h3>"{{hero.name}}"</h3>
        <div>
          <label>Id: </label>{{hero.id}}</div>
        <div>
          <label>Name: </label>
          <input [(ngModel)]="hero.name" placeholder="name"/>
        </div>
        <p>
          <button (click)="gotoHeroes()">Back</button>
        </p>
      </div>
      `,
})
export class HooksListComponent  {
}