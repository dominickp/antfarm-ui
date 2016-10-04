import { Component } from '@angular/core';
import { OnInit } from '@angular/core';

import { Hook } from './hook';
import { HookService } from './hook.service';

@Component({
    moduleId: module.id,
    selector: 'available-hooks',
    template:`
      <h2>My Hooks</h2>
        <div class="hooks list-group">
          <a *ngFor="let hook of hooks" class="list-group-item" 
            [class.active]="hook === selectedHook"
            href="/route/{{hook.id}}">
            <span class="badge">{{hook.id}}</span> {{hook.nest}}
          </a>
        </div>
      `,
    styles: [],
    providers: [HookService]

})

export class HooksComponent implements OnInit {

    constructor(private hookService: HookService) { }

    ngOnInit(): void {
        this.getHooks();
    }

    getHooks(): void {
        this.hookService.getHooks().then(hooks => this.hooks = hooks);
    }

    hooks: Hook[];
    title = 'Available Hooks';
    selectedHook: Hook;

}
