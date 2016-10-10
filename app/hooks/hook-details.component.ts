import {Component, Input, OnInit} from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';

import { HookService } from './hook.service';

@Component({
    selector: 'hook-details',
    template: `
         <div *ngIf="hookService.getHook()">
            <h4>Webhook details</h4>
            <ul class="list-group">
                <li class="list-group-item"><strong>Tunnel:</strong> {{hookService.getHook().tunnel}}</li>
                <li class="list-group-item"><strong>Nest:</strong> {{hookService.getHook().nest}}</li>
                <li class="list-group-item"><strong>ID:</strong> {{hookService.getHook().id}}</li>
                <li class="list-group-item"><strong>Path:</strong> {{hookService.getHook().path}}</li>
                <li class="list-group-item"><strong>Interface Path:</strong> {{hookService.getHook().interface_path}}</li>
                <li class="list-group-item"><strong>Method:</strong> {{hookService.getHook().method.toUpperCase()}}</li>
            </ul>
        </div>
        `
})

export class HookDetailsComponent implements OnInit {

    constructor(
        private hookService: HookService,
        private route: ActivatedRoute,
        private location: Location
    ) {}
    ngOnInit() {}
}
