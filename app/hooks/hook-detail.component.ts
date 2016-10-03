import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';

import { HookService } from './hook.service';
import { Hook } from './hook';

@Component({
    selector: 'my-hook-detail',
    template: `
      <div *ngIf="hook">
        <h2>{{hook.path}} details!</h2>
        <div><label>id: </label>{{hook.id}}</div>
        <div><label>path: </label>{{hook.path}}</div>
        <div><label>nest: </label>{{hook.nest}}</div>
        <div><label>tunnel: </label>{{hook.tunnel}}</div>
        <div><label>interface_path: </label>{{hook.interface_path}}</div>
      </div>
    `
})

export class HookDetailComponent implements OnInit {
    constructor(
        private hookService: HookService,
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
    hook: Hook;
}
