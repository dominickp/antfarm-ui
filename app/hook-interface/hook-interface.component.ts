import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';

import { HookService } from '../hook/hook.service';
import { Hook } from '../hook/hook';

@Component({
    selector: 'hook-interface',
    template: `
        <div class="row">
            <div *ngIf="hookService.getInterface()" class="col-md-8">
                <h2>
                    {{hookService.getHook().tunnel}} interface
                    <span class="badge">{{hookService.getInterface().sessionId}}</span>
                    <small>
                    <span *ngIf="hookService.getInterface().metadata.tooltip" 
                        [tooltip]="hookService.getInterface().metadata.tooltip" tooltipPlacement="right"
                        class="glyphicon glyphicon-info-sign" ></span>
                    </small>
                </h2>
                
                <p *ngIf="hookService.getInterface().metadata.description" class="help-block">
                    {{hookService.getInterface().metadata.description}}
                </p>
                
                <hook-interface-form *ngIf="! hookService.hookResponse"></hook-interface-form>
                
                <div *ngIf="hookService.hookResponse">
                    <div *ngIf="hookService.hookResponse.status == 200" class="alert alert-success" role="alert">
                        <strong>Success!</strong> {{hookService.hookResponse.message}}
                    </div>
                    
                    <div *ngIf="hookService.hookResponse.status != 200" class="alert alert-danger" role="alert">
                        <strong>Something went wrong.</strong> {{hookService.hookResponse|json}}
                    </div>
                    
                </div>
                
            </div>
            
            <div class="col-md-4">
                <hook-interface-metadata></hook-interface-metadata>
            </div>
            
            <div class="col-md-4">
                <hook-details></hook-details>
            </div>

        </div>
    `
})

export class HookInterfaceComponent implements OnInit {

    constructor(
        private hookService: HookService,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.route.params.forEach((params: Params) => {
            let id = params['id'];
            this.hookService.loadHook(id)
                .then((hook) => {
                    if(hook){
                        // this.hook = hook;
                        this.hookService.setHook(hook);
                        this.hookService.getHookInterface(hook.interface_path)
                            .then(hookInterface => {
                                this.hookService.setInterface(hookInterface);
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
}
