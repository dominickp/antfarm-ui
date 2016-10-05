import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';

import { HookService } from './hook.service';
import { Hook } from './hook';
import { HookInterface } from './hook-interface';

@Component({
    selector: 'my-hook-detail',
    template: `
        <div class="row">
            <div *ngIf="hookInterface" class="col-md-8">
                <h2>{{hook.nest}} Interface</h2>
                <hook-interface [hookInterface]="hookInterface" [hook]="hook"></hook-interface>
            </div>
            <div *ngIf="hook" class="col-md-4">
                <h2>Details</h2>
                <div><label>id: </label>{{hook.id}}</div>
                <div><label>path: </label>{{hook.path}}</div>
                <div><label>interface_path: </label>{{hook.interface_path}}</div>
                <div><label>nest: </label>{{hook.nest}}</div>
                <div><label>tunnel: </label>{{hook.tunnel}}</div>
                <div>
                    <label>method: </label> {{hook.method}}
                </div>
            </div>
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
                    if(hook){
                        this.hook = hook;
                        console.log(this.hook);
                        this.hookService.getHookInterface(hook.interface_path)
                            .then(hookInterface => {
                                this.hookInterface = hookInterface;
                                console.log("getting interface", hookInterface);

                            })
                            .catch(reason => {
                                console.log("caught", reason);
                                }
                            );
                    } else {
                        console.log(`Hook ${id} was not found.`);
                    }

                })
                .catch(reason => {
                        console.log("caught", reason);
                    }
                );
        });
    }

    @Input()
    hook: Hook;
    hookInterface: HookInterface;
}
