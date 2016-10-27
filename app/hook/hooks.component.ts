import { Component } from '@angular/core';
import { OnInit } from '@angular/core';

import { Hook } from './hook';
import { HookService } from './hook.service';
import {collectEventListeners} from "@angular/compiler/src/view_compiler/event_binder";
import {ErrorService} from "../error/error.service";
import {ActivatedRoute, Params} from "@angular/router";
import {LocalStorageService} from "../local-storage/local-storage.service";
import {AntfarmServer} from "../management/antfarm-server";


@Component({
    moduleId: module.id,
    selector: 'available-hooks',
    template:`
    <div *ngIf="hooks">
      <h2>My Hooks</h2>
        <div class="hooks list-group">
          <a *ngFor="let hook of hooks" class="list-group-item" 
            [class.active]="hook === selectedHook"
            href="/route/{{selectedServer}}/{{hook.id}}">
            <span class="badge">{{hook.nest}}</span> {{hook.tunnel}}
          </a>
        </div>
    </div>
      `,
    styles: [],
    providers: [HookService]

})

export class HooksComponent implements OnInit {

    selectedServer: number;

    constructor(
        private hookService: HookService,
        private errorService: ErrorService,
        private route: ActivatedRoute
    ) {}



    ngOnInit(): void {

        let hc = this;
        hc.route.params.forEach((params: Params) => {
            hc.selectedServer = params['serverIndex'];
            hc.hookService.setActiveServerId(hc.selectedServer);
            hc.getHooks();
        });


    }

    getHooks(): void {
        let h = this;
        h.hookService.getHooks()
            .then(hooks => {
                h.hooks = hooks;
                h.errorService.message = "";
            })
            .catch(reason => {
                h.errorService.message = "Could not load the hooks from the Antfarm server.";
            });
    }

    hooks: Hook[];
    title = 'Available Hooks';
    selectedHook: Hook;

}
