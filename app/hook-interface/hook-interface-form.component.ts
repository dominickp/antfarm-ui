import {Component, Input, OnInit} from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import { FormsModule }   from '@angular/forms';
// import { TooltipModule } from 'ng2-bootstrap/ng2-bootstrap';

import { HookService } from '../hook/hook.service';
import { Hook } from '../hook/hook';
import { HookInterface } from './hook-interface';

@Component({
    selector: 'hook-interface-form',
    template: `
      <div *ngIf="hookService.getInterface()">
        <form *ngIf="active" (ngSubmit)="upload()" #interfaceForm="ngForm">
        
            <div *ngFor="let field of hookService.getInterface().fields" class="form-group">
            
                <label htmlFor="{{field.id}}">
                    {{field.name}} 
                    <span *ngIf="field.tooltip" [tooltip]="field.tooltip" tooltipPlacement="right"
                        class="glyphicon glyphicon-info-sign" ></span>
                </label>
                
                <div [ngSwitch]="field.type">
                
                    <textarea *ngSwitchCase="'textarea'" class="form-control" id="{{field.id}}" 
                    placeholder="{{field.placeholder}}" name="{{field.id}}"
                    [(ngModel)]="field.value" [attr.readonly]="field.readOnly ? true : null">
                        {{field.defaultValue}}
                    </textarea>
                    
                    <input *ngSwitchCase="'text'" type="text" class="form-control" id="{{field.id}}" 
                    placeholder="{{field.placeholder}}" name="{{field.id}}" value="{{field.defaultValue}}"
                    [(ngModel)]="field.value" [attr.readonly]="field.readOnly ? true : null">
                    
                    <select *ngSwitchCase="'select'" id="{{field.id}}" name="{{field.id}}" 
                        [attr.readonly]="field.readOnly ? true : null" [(ngModel)]="field.value" class="form-control">
                        <!-- Add default value -->
                      <option *ngFor="let value of field.valueList">{{value}}</option>
                    </select>
                    
                    <div class="file_upload" *ngSwitchCase="'file'" [attr.readonly]="field.readOnly ? true : null">
                        <input type="file" name="{{field.id}}" id="{{field.id}}" class="form-control" 
                            (change)="hookService.selectFile($event)">
                    </div>

                    <div *ngSwitchDefault="" class="alert alert-danger" role="alert">
                        <strong>Error!</strong> Field type "{{field.type}}" is not supported.
                    </div>
                  
                </div>
                    
                <p class="help-block">{{field.description}}</p>
                    
            </div>
            
            <!-- Held jobs dropdown, NEED TO BE A FIELD TO SERIALIZE PROPERLY -->
            <div *ngIf="hookService.getInterface().heldJobs">
                <select name="process_held_job_id" id="process_held_job_id" class="form-control" [(ngModel)]="hookService.getInterface().fields.process">
                  <option *ngFor="let job of hookService.getInterface().heldJobs" value="{{job.id}}">{{job.name}}</option>
                </select>
                <hr>
            </div>
            
            <div *ngFor="let step of hookService.getInterface().steps">
                <div *ngIf="step.failure" class="alert alert-warning" role="alert">
                    <strong>Step validation warning!</strong> {{step.failure}}
                </div>

                <button *ngIf="step.complete !== true" class="btn btn-warning" (click)="makeInterfaceRequest($event);">{{step.name}}</button>
                <hr *ngIf="step.complete !== true">
            </div>
            
            <button *ngIf="hookService.getInterface().steps.length === 0" class="btn btn-primary" (click)="upload($event);">Submit</button>
            
        </form>
      </div>
    `
})

export class HookInterfaceFormComponent implements OnInit {


    constructor(
        private hookService: HookService,
        private route: ActivatedRoute,
        private location: Location
    ) {}

    upload (event) {
        let model = this;
        event.preventDefault();

        model.hookService.upload(event);
    };

    makeInterfaceRequest(event) {
        let model = this;
        event.preventDefault();

        model.hookService.upload(event, false, (data) => {

            if (data) {
                console.log(data);
                model.hookService.setInterface(JSON.parse(data) as HookInterface);
            } else {
                console.error("No data returned!");
            }


        });

    }
    //
    // @Input()
    // hook: Hook;

    active = true;
    submitted = false;

    ngOnInit() {}

}
