import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';

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
                <input type="text" class="form-control" id="{{field.id}}" placeholder="{{field.placeholder}}"
                    name="{{field.id}}"
                    [(ngModel)]="field.value">
            </div>
            
            <button type="submit" class="btn btn-default">Submit</button>
            
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

    ngOnInit(): void {

    }

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
}
