import { Component } from '@angular/core';
import { OnInit } from '@angular/core';

import { Hook } from './hook';
import { HookService } from './hook.service';

@Component({
    moduleId: module.id,
    selector: 'available-hooks',
    template:`
        <my-hook-detail [hook]="selectedHook"></my-hook-detail>

      <h2>My Hooks</h2>
        <ul class="hooks list-group">
          <li *ngFor="let hook of hooks" class="list-group-item" 
            [class.active]="hook === selectedHook"
            (click)="onSelect(hook)">
            <span class="badge">{{hook.id}}</span> {{hook.nest}}
          </li>
        </ul>
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
    title = 'Tour of Heroes';
    selectedHook: Hook;

    onSelect(hook: Hook): void {
        this.selectedHook = hook;
    }
}
