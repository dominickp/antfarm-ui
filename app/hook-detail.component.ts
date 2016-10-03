import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';

import { HookService } from './hook.service';
import { Hook } from './hook';

@Component({
    selector: 'my-hero-detail',
    template: `
      <div *ngIf="hero">
        <h2>{{hero.path}} details!</h2>
        <div><label>id: </label>{{hero.id}}</div>
        <div>
          <label>name: </label>
          <input [(ngModel)]="hero.name" placeholder="name"/>
        </div>
      </div>
    `
})

export class HookDetailComponent implements OnInit {
    constructor(
        private heroService: HookService,
        private route: ActivatedRoute,
        private location: Location
    ) {}

    ngOnInit(): void {
        this.route.params.forEach((params: Params) => {
            let id = +params['id'];
            // this.heroService.getHero(id)
            //     .then(hero => this.hero = hero);
        });
    }

    @Input()
    hero: Hook;
}
