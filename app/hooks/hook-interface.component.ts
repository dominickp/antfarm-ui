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
        <div *ngFor="let field of hookInterface.fields" class="form-group">
            <label htmlFor="{{field.id}}">{{field.name}}</label>
            <input type="text" class="form-control" id="{{field.id}}" placeholder="{{field.placeholder}}">
        </div>
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
}
