import {Component, Input, OnInit} from '@angular/core';
import { HookService } from '../hook/hook.service';
import {LocalStorageService} from "../local-storage/local-storage.service";
import { FormBuilder, Validators } from '@angular/forms';
import {AntfarmServer} from "./antfarm-server";

@Component({
    selector: 'antfarm-servers',
    template: `<h2>Antfarm servers</h2>
                <ul class="list-group">
                    <li class="list-group-item" *ngFor="let server of hookService.getServers(); let i = index">
                        {{server.host}}:{{server.port}}
                        <a class="btn btn-primary btn-sm" href="hooks/{{i}}">View hooks</a>
                        <button class="btn btn-danger btn-xs pull-right" (click)="hookService.deleteServer(i)">&times;</button>
                    </li>
                </ul>

              <h3>Add server</h3>
              <form class="form-inline">
                  <div class="form-group">
                    <input [(ngModel)]="addServerForm.host" name="host" type="text" class="form-control" id="host" placeholder="192.168.1.1">
                  </div>
                  <div class="form-group">
                    <input [(ngModel)]="addServerForm.port" name="port" type="number" class="form-control" id="port" placeholder="8081">
                  </div>
                  <button type="button" class="btn btn-default" (click)="addServer($event);">
                      <span class="glyphicon glyphicon-plus" aria-hidden="true"></span> Add
                    </button>
            </form>
            
           
`
})

export class AntfarmServersComponent {

    constructor(private hookService: HookService){

    }

    protected fb = new FormBuilder();

    protected addServerForm = { host: null, port: null };


    public addServer(event) {
        let asc = this;
        event.preventDefault();
        let server = {host: asc.addServerForm.host, port: asc.addServerForm.port} as AntfarmServer;
        console.log("about to add", server);
        asc.hookService.addServer(server);
    }
}