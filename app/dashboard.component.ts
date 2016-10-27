import { Component, OnInit } from '@angular/core';

import { Hook } from './hook/hook';
import { HookService } from './hook/hook.service';
import {AntfarmServersComponent} from './management/antfarm-servers.component';

@Component({
    moduleId: module.id,
    selector: 'my-dashboard',
    // templateUrl: 'dashboard.component.html',
    template: `<div></div><antfarm-servers></antfarm-servers>`
})

export class DashboardComponent implements OnInit {

    hooks: Hook[] = [];

    constructor(private hookService: HookService) { }

    ngOnInit(): void {
        // this.hookService.getHooks()
        //     .then(hooks => this.hooks = hooks.slice(1, 5));
    }

    gotoDetail(hook: Hook): void { /* not implemented yet */}
}
