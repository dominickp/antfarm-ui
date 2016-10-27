"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var hook_service_1 = require('../hook/hook.service');
var local_storage_service_1 = require("../local-storage/local-storage.service");
var forms_1 = require('@angular/forms');
var antfarm_server_1 = require("./antfarm-server");
var AntfarmServersComponent = (function () {
    function AntfarmServersComponent(hookService, storageService) {
        this.hookService = hookService;
        this.storageService = storageService;
        this.fb = new forms_1.FormBuilder();
        this.addServerForm = { host: null, port: null };
        this.servers = storageService.get("servers") || [];
        console.log(this.servers);
    }
    AntfarmServersComponent.prototype.addServer = function (event) {
        var asc = this;
        event.preventDefault();
        console.log(this.addServerForm);
        var server = new antfarm_server_1.AntfarmServer(asc.addServerForm.host, asc.addServerForm.port);
        asc.servers.push(server);
        asc.storageService.save("servers", asc.servers);
    };
    AntfarmServersComponent = __decorate([
        core_1.Component({
            selector: 'antfarm-servers',
            template: "<h2>Antfarm servers</h2>\n                <ul class=\"list-group\">\n                    <li class=\"list-group-item\" *ngFor=\"let server of servers\">{{server.host}}:{{server.port}}</li>\n                </ul>\n\n              <h3>Add server</h3>\n              <form class=\"form-inline\">\n                  <div class=\"form-group\">\n                    <input [(ngModel)]=\"addServerForm.host\" name=\"host\" type=\"text\" class=\"form-control\" id=\"host\" placeholder=\"192.168.1.1\">\n                  </div>\n                  <div class=\"form-group\">\n                    <input [(ngModel)]=\"addServerForm.port\" name=\"port\" type=\"number\" class=\"form-control\" id=\"port\" placeholder=\"8081\">\n                  </div>\n                  <button type=\"button\" class=\"btn btn-default\" (click)=\"addServer($event);\">\n                      <span class=\"glyphicon glyphicon-plus\" aria-hidden=\"true\"></span> Add\n                    </button>\n            </form>\n            \n           \n"
        }), 
        __metadata('design:paramtypes', [hook_service_1.HookService, local_storage_service_1.LocalStorageService])
    ], AntfarmServersComponent);
    return AntfarmServersComponent;
}());
exports.AntfarmServersComponent = AntfarmServersComponent;
//# sourceMappingURL=antfarm-servers.component.js.map