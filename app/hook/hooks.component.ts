import { Component } from '@angular/core';
import { OnInit } from '@angular/core';

import { Hook } from './hook';
import { HookService } from './hook.service';
import {collectEventListeners} from "@angular/compiler/src/view_compiler/event_binder";
import {ErrorService} from "../error/error.service";


@Component({
    moduleId: module.id,
    selector: 'available-hooks',
    template:`
    <div *ngIf="hooks">
      <h2>My Hooks</h2>
        <div class="hooks list-group">
          <a *ngFor="let hook of hooks" class="list-group-item" 
            [class.active]="hook === selectedHook"
            href="/route/{{hook.id}}">
            <span class="badge">{{hook.nest}}</span> {{hook.tunnel}}
          </a>
        </div>
    </div>
      `,
    styles: [],
    providers: [HookService]

})

export class HooksComponent implements OnInit {

    constructor(
        private hookService: HookService,
        private errorService: ErrorService
    ) { }

    ngOnInit(): void {
        this.getHooks();
    }

    getHooks(): void {
        let h = this;
        h.hookService.getHooks()
            .then(hooks => h.hooks = hooks)
            .catch(reason => {
                console.log("caughtx", reason);
                h.errorService.message = "Could not load the hooks from the Antfarm server.";
            });
    }

    hooks: Hook[];
    title = 'Available Hooks';
    selectedHook: Hook;

}
