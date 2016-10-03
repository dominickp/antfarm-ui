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
var HookDetailComponent = (function () {
    function HookDetailComponent(hookService, route, location) {
        this.hookService = hookService;
        this.route = route;
        this.location = location;
    }
    HookDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.forEach(function (params) {
            var id = params['id'];
            _this.hookService.getHook(id)
                .then(function (hook) {
                _this.hook = hook;
                _this.hookService.getHookInterface(_this.hook.interface_path)
                    .then(function (hookInterface) {
                    _this.hookInterface = hookInterface;
                    console.log("getting interface", hookInterface);
                });
            });
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', hook_1.Hook)
    ], HookDetailComponent.prototype, "hook", void 0);
    HookDetailComponent = __decorate([
        core_1.Component({
            selector: 'my-hook-detail',
            template: "\n      <div *ngIf=\"hook\">\n        <h2>{{hook.path}} details!</h2>\n        <div><label>id: </label>{{hook.id}}</div>\n        <div><label>path: </label>{{hook.path}}</div>\n        <div><label>nest: </label>{{hook.nest}}</div>\n        <div><label>tunnel: </label>{{hook.tunnel}}</div>\n        <div><label>interface_path: </label>{{hook.interface_path}}</div>\n        <div><label>methods: </label>{{hook.methods.toString()}}</div>\n      </div>\n      <div *ngIf=\"hookInterface\">\n        <h2>Interface definition resolved!</h2>\n      </div>\n    "
        }), 
        __metadata('design:paramtypes', [hook_service_1.HookService, router_1.ActivatedRoute, common_1.Location])
    ], HookDetailComponent);
    return HookDetailComponent;
}());
exports.HookDetailComponent = HookDetailComponent;
//# sourceMappingURL=hook-detail.component.js.map