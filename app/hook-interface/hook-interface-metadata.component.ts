import {Component, Input, OnInit} from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';

import { HookService } from '../hook/hook.service';

@Component({
    selector: 'hook-interface-metadata',
    template: `
        <div *ngIf="hookService.getInterface()">

            <div *ngIf="hookService.getInterface().metadata">
                <h4>Metadata properties</h4>
                    
                <ul class="list-group" *ngIf="hookService.getInterface().metadata.interfaceProperties">                    
                    <li *ngFor="let prop of hookService.getInterface().metadata.interfaceProperties" class="list-group-item">
                        <strong>{{prop.key}}:</strong> {{prop.value}}
                    </li>
                </ul>
            </div>
            
        </div>
        `
        })

export class HookInterfaceMetadataComponent implements OnInit {

    constructor(
        private hookService: HookService,
        private route: ActivatedRoute,
        private location: Location
    ) {}
    ngOnInit() {}
}
