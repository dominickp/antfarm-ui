import { Component, Input, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import { FormsModule }   from '@angular/forms';

import { HookService } from './hook.service';
import { Hook } from './hook';
import { HookInterface } from './hook-interface';

@Component({
    selector: 'hook-interface',
    template: `
      <div *ngIf="hookInterface">
        <form *ngIf="active" (ngSubmit)="onSubmit()" #interfaceForm="ngForm">
        
            <div *ngFor="let field of hookInterface.fields" class="form-group">
                <label htmlFor="{{field.id}}">{{field.name}}</label>
                
                    
                    <div [ngSwitch]="field.type">
                        <input *ngSwitchCase="'text'" type="text" class="form-control" id="{{field.id}}" 
                        placeholder="{{field.placeholder}}" name="{{field.id}}"
                        [(ngModel)]="field.value">
                        
                        <select *ngSwitchCase="'select'" id="{{field.id}}" name="{{field.id}}" class="form-control">
                          <option *ngFor="let value of field.acceptableValues">{{value}}</option>
                        </select>
                        
                        <!--<input *ngSwitchCase="'file'" NgFileSelect type="file" class="form-control" id="{{field.id}}" -->
                        <!--placeholder="{{field.placeholder}}" name="{{field.id}}"-->
                        <!--[(ngModel)]="field.value"  (onUpload)="handleUpload($event)">-->
                        
                        <!--<div class="file_upload" *ngSwitchCase="'file'" >-->
                            <!--<input type="file" name="{{field.id}}" id="{{field.id}}" class="form-control" -->
                               <!--ngFileSelect-->
                               <!--[options]="basicOptions" -->
                           <!---->
                               <!--(onUpload)="handleUpload($event)"-->
                               <!--&gt;-->
                        <div class="file_upload" *ngSwitchCase="'file'" >
                            <input type="file" name="{{field.id}}" id="{{field.id}}" class="form-control" 
                               >
                               
                                <div>
                                  Response: {{ response | json }}
                                </div>
                                
                                <div>
                                  Progress: {{ progress }}%
                                </div>
                        </div>
                        
            
                        <div *ngSwitchDefault="" class="alert alert-danger" role="alert">
                            <strong>Error!</strong> Field type "{{field.type}}" is not supported.
                        </div>
                      
                    </div>
                    
                   
                    
                    
            </div>
            
            <button (click)="submit($event)" class="btn btn-default">Submit</button>
            
        </form>
      </div>
    `
})

export class HookInterfaceComponent implements OnInit {
    constructor(
        private hookService: HookService,
        private route: ActivatedRoute,
        private location: Location

    ) {}


    @Input()
    hookInterface: HookInterface;
    @Input()
    hook: Hook;

    active = true;
    submitted = false;

    onSubmit() {
        this.submitted = true;
        console.log("Submitting", this.hookInterface.fields);

        this.hookService.makeRequest(this.hookInterface, this.hook)
            .then((response) => {
                console.log(response);
            });
    }

    submit = function($event) {
        // our function body
        $event.preventDefault();

        this.onSubmit();

    };

    ngOnInit(){

    }


    //
    // private zone: NgZone;
    // private basicOptions: Object;
    // private progress: number = 0;
    // private response: any = {};
    //
    //
    // protected endpoint = "http://insight.dev:8081/hooks/proof/create";
    //
    // ngOnInit() {
    //     this.zone = new NgZone({ enableLongStackTrace: false });
    //     this.basicOptions = {
    //         url: this.endpoint,
    //         autoUpload: false
    //     };
    // }
    //
    // handleUpload(data: any): void {
    //     this.zone.run(() => {
    //         this.response = data;
    //         this.progress = data.progress.percent / 100;
    //     });
    // }

}
