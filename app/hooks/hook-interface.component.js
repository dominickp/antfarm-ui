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
var hook_service_1 = require('./hook.service');
var hook_1 = require('./hook');
var hook_interface_1 = require('./hook-interface');
var HookInterfaceComponent = (function () {
    function HookInterfaceComponent(hookService, route, location) {
        this.hookService = hookService;
        this.route = route;
        this.location = location;
        this.active = true;
        this.submitted = false;
        this.submit = function ($event) {
            // our function body
            $event.preventDefault();
            this.onSubmit();
        };
    }
    HookInterfaceComponent.prototype.onSubmit = function () {
        this.submitted = true;
        console.log("Submitting", this.hookInterface.fields);
        this.hookService.makeRequest(this.hookInterface, this.hook)
            .then(function (response) {
            console.log(response);
        });
    };
    HookInterfaceComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', hook_interface_1.HookInterface)
    ], HookInterfaceComponent.prototype, "hookInterface", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', hook_1.Hook)
    ], HookInterfaceComponent.prototype, "hook", void 0);
    HookInterfaceComponent = __decorate([
        core_1.Component({
            selector: 'hook-interface',
            template: "\n      <div *ngIf=\"hookInterface\">\n        <form *ngIf=\"active\" (ngSubmit)=\"onSubmit()\" #interfaceForm=\"ngForm\">\n        \n            <div *ngFor=\"let field of hookInterface.fields\" class=\"form-group\">\n                <label htmlFor=\"{{field.id}}\">{{field.name}}</label>\n                \n                    \n                    <div [ngSwitch]=\"field.type\">\n                        <input *ngSwitchCase=\"'text'\" type=\"text\" class=\"form-control\" id=\"{{field.id}}\" \n                        placeholder=\"{{field.placeholder}}\" name=\"{{field.id}}\"\n                        [(ngModel)]=\"field.value\">\n                        \n                        <select *ngSwitchCase=\"'select'\" id=\"{{field.id}}\" name=\"{{field.id}}\" class=\"form-control\">\n                          <option *ngFor=\"let value of field.acceptableValues\">{{value}}</option>\n                        </select>\n                        \n                        <!--<input *ngSwitchCase=\"'file'\" NgFileSelect type=\"file\" class=\"form-control\" id=\"{{field.id}}\" -->\n                        <!--placeholder=\"{{field.placeholder}}\" name=\"{{field.id}}\"-->\n                        <!--[(ngModel)]=\"field.value\"  (onUpload)=\"handleUpload($event)\">-->\n                        \n                        <!--<div class=\"file_upload\" *ngSwitchCase=\"'file'\" >-->\n                            <!--<input type=\"file\" name=\"{{field.id}}\" id=\"{{field.id}}\" class=\"form-control\" -->\n                               <!--ngFileSelect-->\n                               <!--[options]=\"basicOptions\" -->\n                           <!---->\n                               <!--(onUpload)=\"handleUpload($event)\"-->\n                               <!--&gt;-->\n                        <div class=\"file_upload\" *ngSwitchCase=\"'file'\" >\n                            <input type=\"file\" name=\"{{field.id}}\" id=\"{{field.id}}\" class=\"form-control\" \n                               >\n                               \n                                <div>\n                                  Response: {{ response | json }}\n                                </div>\n                                \n                                <div>\n                                  Progress: {{ progress }}%\n                                </div>\n                        </div>\n                        \n            \n                        <div *ngSwitchDefault=\"\" class=\"alert alert-danger\" role=\"alert\">\n                            <strong>Error!</strong> Field type \"{{field.type}}\" is not supported.\n                        </div>\n                      \n                    </div>\n                    \n                   \n                    \n                    \n            </div>\n            \n            <button (click)=\"submit($event)\" class=\"btn btn-default\">Submit</button>\n            \n        </form>\n      </div>\n    "
        }), 
        __metadata('design:paramtypes', [hook_service_1.HookService, router_1.ActivatedRoute, common_1.Location])
    ], HookInterfaceComponent);
    return HookInterfaceComponent;
}());
exports.HookInterfaceComponent = HookInterfaceComponent;
//# sourceMappingURL=hook-interface.component.js.map