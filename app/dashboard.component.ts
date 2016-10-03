import { Component, OnInit } from '@angular/core';

import { Hook } from './hooks/hook';
import { HookService } from './hooks/hook.service';

@Component({
    moduleId: module.id,
    selector: 'my-dashboard',
    templateUrl: 'dashboard.component.html',
})

export class DashboardComponent implements OnInit {

    hooks: Hook[] = [];

    constructor(private hookService: HookService) { }

    ngOnInit(): void {
        this.hookService.getHooks()
            .then(hooks => this.hooks = hooks.slice(1, 5));
    }

    gotoDetail(hook: Hook): void { /* not implemented yet */}
}
