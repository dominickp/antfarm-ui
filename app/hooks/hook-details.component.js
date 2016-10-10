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
var HookDetailsComponent = (function () {
    function HookDetailsComponent(hookService, route, location) {
        this.hookService = hookService;
        this.route = route;
        this.location = location;
    }
    HookDetailsComponent.prototype.ngOnInit = function () { };
    HookDetailsComponent = __decorate([
        core_1.Component({
            selector: 'hook-details',
            template: "\n         <div *ngIf=\"hookService.getHook()\">\n            <h4>Webhook details</h4>\n            <ul class=\"list-group\">\n                <li class=\"list-group-item\"><strong>Tunnel:</strong> {{hookService.getHook().tunnel}}</li>\n                <li class=\"list-group-item\"><strong>Nest:</strong> {{hookService.getHook().nest}}</li>\n                <li class=\"list-group-item\"><strong>ID:</strong> {{hookService.getHook().id}}</li>\n                <li class=\"list-group-item\"><strong>Path:</strong> {{hookService.getHook().path}}</li>\n                <li class=\"list-group-item\"><strong>Interface Path:</strong> {{hookService.getHook().interface_path}}</li>\n                <li class=\"list-group-item\"><strong>Method:</strong> {{hookService.getHook().method.toUpperCase()}}</li>\n            </ul>\n        </div>\n        "
        }), 
        __metadata('design:paramtypes', [hook_service_1.HookService, router_1.ActivatedRoute, common_1.Location])
    ], HookDetailsComponent);
    return HookDetailsComponent;
}());
exports.HookDetailsComponent = HookDetailsComponent;
//# sourceMappingURL=hook-details.component.js.map