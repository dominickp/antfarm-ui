import {Component, Input, OnInit} from '@angular/core';
import { HookService } from '../hook/hook.service';
import {LocalStorageService} from "../local-storage/local-storage.service";
import { FormBuilder, Validators } from '@angular/forms';
import {AntfarmServer} from "./antfarm-server";

@Component({
    selector: 'antfarm-servers',
    template: `<h2>Antfarm servers</h2>
                <ul class="list-group">
                    <li class="list-group-item" *ngFor="let server of servers; let i = index">
                        {{server.host}}:{{server.port}}
                        <button class="btn btn-danger btn-xs pull-right" (click)="deleteServer(i)">&times;</button>
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

    servers: AntfarmServer[];

    constructor(private hookService: HookService, private storageService: LocalStorageService ){
        this.servers = storageService.get("servers") as AntfarmServer[] || [];

        console.log(this.servers);
    }

    protected fb = new FormBuilder();

    protected addServerForm = { host: null, port: null };

    protected getServer(index: number) {
        return this.servers[index];
    }

    public deleteServer(index: number) {
        let asc = this;
        asc.servers.splice(index, 1);
        asc.updateServerStorage();
    }

    public updateServerStorage() {
        let asc = this;
        asc.storageService.save("servers", asc.servers);
    }

    public addServer(event) {
        let asc = this;
        event.preventDefault();

        let server = new AntfarmServer(asc.addServerForm.host, asc.addServerForm.port);

        asc.servers.push(server);

        asc.updateServerStorage();
    }
}