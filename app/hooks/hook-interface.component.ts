import {Component, Input, OnInit} from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import { FormsModule }   from '@angular/forms';
// import { TooltipModule } from 'ng2-bootstrap/ng2-bootstrap';

import { HookService } from './hook.service';
import { Hook } from './hook';
import { HookInterface } from './hook-interface';

@Component({
    selector: 'hook-interface',
    template: `
      <div *ngIf="hookInterface">
        <form *ngIf="active" (ngSubmit)="upload()" #interfaceForm="ngForm">
        
            <div *ngFor="let field of hookInterface.fields" class="form-group">
            
                <label htmlFor="{{field.id}}">
                    {{field.name}} 
                    <span *ngIf="field.tooltip" [tooltip]="field.tooltip" tooltipPlacement="right"
                        class="glyphicon glyphicon-info-sign" ></span>
                </label>
                
                <div [ngSwitch]="field.type">
                
                    <textarea *ngSwitchCase="'textarea'" class="form-control" id="{{field.id}}" 
                    placeholder="{{field.placeholder}}" name="{{field.id}}"
                    [(ngModel)]="field.value">{{field.defaultValue}}</textarea>
                    
                    <input *ngSwitchCase="'text'" type="text" class="form-control" id="{{field.id}}" 
                    placeholder="{{field.placeholder}}" name="{{field.id}}" value="{{field.defaultValue}}"
                    [(ngModel)]="field.value">
                    
                    <select *ngSwitchCase="'select'" id="{{field.id}}" name="{{field.id}}" class="form-control">
                        <!-- Add default value -->
                      <option *ngFor="let value of field.acceptableValues">{{value}}</option>
                    </select>
                    
                    <div class="file_upload" *ngSwitchCase="'file'" >
                        <input type="file" name="{{field.id}}" id="{{field.id}}" class="form-control" 
                            (change)="hookService.selectFile($event)">
                    </div>

                    <div *ngSwitchDefault="" class="alert alert-danger" role="alert">
                        <strong>Error!</strong> Field type "{{field.type}}" is not supported.
                    </div>
                  
                </div>
                    
                <p class="help-block">{{field.description}}</p>
                    
            </div>
            
            <div *ngFor="let step of hookInterface.steps">
                <button *ngIf="step.complete !== true" class="btn btn-warning" (click)="makeInterfaceRequest($event);">{{step.name}}</button>
                <hr>
            </div>
            
            <button class="btn btn-primary" (click)="upload($event);">Submit</button>
            
        </form>
      </div>
    `
})

export class HookInterfaceComponent implements OnInit {


    constructor(
        private hookService: HookService,
        private route: ActivatedRoute,
        private location: Location
    ) {


    }

    upload (event) {
        let model = this;
        event.preventDefault();

        model.hookService.upload(event, model.hookInterface, model.hook);
    };

    makeInterfaceRequest(event) {
        let model = this;
        event.preventDefault();

        model.hookService.upload(event, model.hookInterface, model.hook, false, (data) => {

            if (data) {
                console.log(data);
                model.hookInterface = JSON.parse(data) as HookInterface;
            } else {
                console.error("No data returned!");
            }


        });

    }

    @Input()
    hookInterface: HookInterface;
    @Input()
    hook: Hook;

    active = true;
    submitted = false;

    ngOnInit() {}

}
