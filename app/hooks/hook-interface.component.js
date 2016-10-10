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
var router_1 = require('@angular/router');
var common_1 = require('@angular/common');
// import { TooltipModule } from 'ng2-bootstrap/ng2-bootstrap';
var hook_service_1 = require('./hook.service');
var HookInterfaceComponent = (function () {
    function HookInterfaceComponent(hookService, route, location) {
        this.hookService = hookService;
        this.route = route;
        this.location = location;
        //
        // @Input()
        // hook: Hook;
        this.active = true;
        this.submitted = false;
    }
    HookInterfaceComponent.prototype.upload = function (event) {
        var model = this;
        event.preventDefault();
        model.hookService.upload(event);
    };
    ;
    HookInterfaceComponent.prototype.makeInterfaceRequest = function (event) {
        var model = this;
        event.preventDefault();
        model.hookService.upload(event, false, function (data) {
            if (data) {
                console.log(data);
                model.hookService.setInterface(JSON.parse(data));
            }
            else {
                console.error("No data returned!");
            }
        });
    };
    HookInterfaceComponent.prototype.ngOnInit = function () { };
    HookInterfaceComponent = __decorate([
        core_1.Component({
            selector: 'hook-interface',
            template: "\n      <div *ngIf=\"hookService.getInterface()\">\n        <form *ngIf=\"active\" (ngSubmit)=\"upload()\" #interfaceForm=\"ngForm\">\n        \n            <div *ngFor=\"let field of hookService.getInterface().fields\" class=\"form-group\">\n            \n                <label htmlFor=\"{{field.id}}\">\n                    {{field.name}} \n                    <span *ngIf=\"field.tooltip\" [tooltip]=\"field.tooltip\" tooltipPlacement=\"right\"\n                        class=\"glyphicon glyphicon-info-sign\" ></span>\n                </label>\n                \n                <div [ngSwitch]=\"field.type\">\n                \n                    <textarea *ngSwitchCase=\"'textarea'\" class=\"form-control\" id=\"{{field.id}}\" \n                    placeholder=\"{{field.placeholder}}\" name=\"{{field.id}}\"\n                    [(ngModel)]=\"field.value\">{{field.defaultValue}}</textarea>\n                    \n                    <input *ngSwitchCase=\"'text'\" type=\"text\" class=\"form-control\" id=\"{{field.id}}\" \n                    placeholder=\"{{field.placeholder}}\" name=\"{{field.id}}\" value=\"{{field.defaultValue}}\"\n                    [(ngModel)]=\"field.value\">\n                    \n                    <select *ngSwitchCase=\"'select'\" id=\"{{field.id}}\" name=\"{{field.id}}\" class=\"form-control\">\n                        <!-- Add default value -->\n                      <option *ngFor=\"let value of field.acceptableValues\">{{value}}</option>\n                    </select>\n                    \n                    <div class=\"file_upload\" *ngSwitchCase=\"'file'\" >\n                        <input type=\"file\" name=\"{{field.id}}\" id=\"{{field.id}}\" class=\"form-control\" \n                            (change)=\"hookService.selectFile($event)\">\n                    </div>\n\n                    <div *ngSwitchDefault=\"\" class=\"alert alert-danger\" role=\"alert\">\n                        <strong>Error!</strong> Field type \"{{field.type}}\" is not supported.\n                    </div>\n                  \n                </div>\n                    \n                <p class=\"help-block\">{{field.description}}</p>\n                    \n            </div>\n            \n            <div *ngFor=\"let step of hookService.getInterface().steps\">\n                <button *ngIf=\"step.complete !== true\" class=\"btn btn-warning\" (click)=\"makeInterfaceRequest($event);\">{{step.name}}</button>\n                <hr>\n            </div>\n            \n            <button class=\"btn btn-primary\" (click)=\"upload($event);\">Submit</button>\n            \n        </form>\n      </div>\n    "
        }), 
        __metadata('design:paramtypes', [hook_service_1.HookService, router_1.ActivatedRoute, common_1.Location])
    ], HookInterfaceComponent);
    return HookInterfaceComponent;
}());
exports.HookInterfaceComponent = HookInterfaceComponent;
//# sourceMappingURL=hook-interface.component.js.map