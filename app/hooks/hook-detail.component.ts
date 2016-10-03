import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';

import { HookService } from './hook.service';
import { Hook } from './hook';
import { HookInterface } from './hook-interface';

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
        <div><label>methods: </label>{{hook.methods}}</div>
      </div>
      <div *ngIf="hookInterface">
        <h2>Interface definition resolved!</h2>
        <hook-interface [hookInterface]="hookInterface" [hook]="hook"></hook-interface>
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
            let id = params['id'];
            this.hookService.getHook(id)
                .then((hook) => {
                    this.hook = hook;

                    console.log(this.hook);
                    this.hookService.getHookInterface(this.hook.interface_path)
                        .then(hookInterface => {
                            this.hookInterface = hookInterface;
                             console.log("getting interface", hookInterface);
                        });
                });
        });
    }

    @Input()
    hook: Hook;
    hookInterface: HookInterface;
}
