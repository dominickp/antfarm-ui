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
            <div *ngIf="hookService.getInterface()" class="col-md-8">
                <h2>
                    {{hookService.getHook().tunnel}} interface
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

export class HookDetailComponent implements OnInit {

    constructor(
        private hookService: HookService,
        private route: ActivatedRoute,
        private location: Location
    ) {}

    ngOnInit(): void {
        this.route.params.forEach((params: Params) => {
            let id = params['id'];
            this.hookService.loadHook(id)
                .then((hook) => {
                    if(hook){
                        // this.hook = hook;
                        this.hookService.setHook(hook);
                        console.log(this.hook);
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
    hookInterface: HookInterface;
}
