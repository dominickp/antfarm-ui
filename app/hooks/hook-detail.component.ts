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
                
                <hook-interface *ngIf="! hookService.hookResponse"
                    [hookInterface]="hookInterface" [hook]="hook"></hook-interface>
                
                <div *ngIf="hookService.hookResponse">
                    <div *ngIf="hookService.hookResponse.status == 200" class="alert alert-success" role="alert">
                        <strong>Success!</strong> {{hookService.hookResponse.message}}
                    </div>
                    
                    <div *ngIf="hookService.hookResponse.status != 200" class="alert alert-danger" role="alert">
                        <strong>Something went wrong.</strong> {{hookService.hookResponse|json}}
                    </div>
                    
                </div>
                
            </div>
            <div *ngIf="hook" class="col-md-4">
                <h4>Webhook Details</h4>
                <ul class="list-group">
                    <li class="list-group-item"><strong>Tunnel:</strong> {{hook.tunnel}}</li>
                    <li class="list-group-item"><strong>Nest:</strong> {{hook.nest}}</li>
                    <li class="list-group-item"><strong>ID:</strong> {{hook.id}}</li>
                    <li class="list-group-item"><strong>Path:</strong> {{hook.path}}</li>
                    <li class="list-group-item"><strong>Interface Path:</strong> {{hook.interface_path}}</li>
                    <li class="list-group-item"><strong>Method:</strong> {{hook.method.toUpperCase()}}</li>
                </ul>
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
