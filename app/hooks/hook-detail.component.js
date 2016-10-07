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
                if (hook) {
                    _this.hook = hook;
                    console.log(_this.hook);
                    _this.hookService.getHookInterface(hook.interface_path)
                        .then(function (hookInterface) {
                        _this.hookInterface = hookInterface;
                        console.log("getting interface", hookInterface);
                    })
                        .catch(function (reason) {
                        console.log("caught", reason);
                    });
                }
                else {
                    console.log("Hook " + id + " was not found.");
                }
            })
                .catch(function (reason) {
                console.log("caught", reason);
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
            template: "\n        <div class=\"row\">\n            <div *ngIf=\"hookInterface\" class=\"col-md-8\">\n                <h2>{{hook.tunnel}} interface</h2>\n                \n                <hook-interface *ngIf=\"! hookService.hookResponse\"\n                    [hookInterface]=\"hookInterface\" [hook]=\"hook\"></hook-interface>\n                \n                <div *ngIf=\"hookService.hookResponse\">\n                    <div *ngIf=\"hookService.hookResponse.status == 200\" class=\"alert alert-success\" role=\"alert\">\n                        <strong>Success!</strong> {{hookService.hookResponse.message}}\n                    </div>\n                    \n                    <div *ngIf=\"hookService.hookResponse.status != 200\" class=\"alert alert-danger\" role=\"alert\">\n                        <strong>Something went wrong.</strong> {{hookService.hookResponse|json}}\n                    </div>\n                    \n                </div>\n                \n            </div>\n            <div *ngIf=\"hook\" class=\"col-md-4\">\n                <h4>Webhook Details</h4>\n                <ul class=\"list-group\">\n                    <li class=\"list-group-item\"><strong>Tunnel:</strong> {{hook.tunnel}}</li>\n                    <li class=\"list-group-item\"><strong>Nest:</strong> {{hook.nest}}</li>\n                    <li class=\"list-group-item\"><strong>ID:</strong> {{hook.id}}</li>\n                    <li class=\"list-group-item\"><strong>Path:</strong> {{hook.path}}</li>\n                    <li class=\"list-group-item\"><strong>Interface Path:</strong> {{hook.interface_path}}</li>\n                    <li class=\"list-group-item\"><strong>Method:</strong> {{hook.method.toUpperCase()}}</li>\n                </ul>\n            </div>\n        </div>\n    "
        }), 
        __metadata('design:paramtypes', [hook_service_1.HookService, router_1.ActivatedRoute, common_1.Location])
    ], HookDetailComponent);
    return HookDetailComponent;
}());
exports.HookDetailComponent = HookDetailComponent;
//# sourceMappingURL=hook-detail.component.js.map