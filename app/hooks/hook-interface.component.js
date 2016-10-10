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
var HookInterfaceComponent = (function () {
    function HookInterfaceComponent(hookService, route, location) {
        this.hookService = hookService;
        this.route = route;
        this.location = location;
    }
    HookInterfaceComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.forEach(function (params) {
            var id = params['id'];
            _this.hookService.loadHook(id)
                .then(function (hook) {
                if (hook) {
                    // this.hook = hook;
                    _this.hookService.setHook(hook);
                    console.log(_this.hook);
                    _this.hookService.getHookInterface(hook.interface_path)
                        .then(function (hookInterface) {
                        _this.hookService.setInterface(hookInterface);
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
    ], HookInterfaceComponent.prototype, "hook", void 0);
    HookInterfaceComponent = __decorate([
        core_1.Component({
            selector: 'hook-interface',
            template: "\n        <div class=\"row\">\n            <div *ngIf=\"hookService.getInterface()\" class=\"col-md-8\">\n                <h2>\n                    {{hookService.getHook().tunnel}} interface\n                    <small>\n                    <span *ngIf=\"hookService.getInterface().metadata.tooltip\" \n                        [tooltip]=\"hookService.getInterface().metadata.tooltip\" tooltipPlacement=\"right\"\n                        class=\"glyphicon glyphicon-info-sign\" ></span>\n                    </small>\n                </h2>\n                \n                <p *ngIf=\"hookService.getInterface().metadata.description\" class=\"help-block\">\n                    {{hookService.getInterface().metadata.description}}\n                </p>\n                \n                <hook-interface-form *ngIf=\"! hookService.hookResponse\"></hook-interface-form>\n                \n                <div *ngIf=\"hookService.hookResponse\">\n                    <div *ngIf=\"hookService.hookResponse.status == 200\" class=\"alert alert-success\" role=\"alert\">\n                        <strong>Success!</strong> {{hookService.hookResponse.message}}\n                    </div>\n                    \n                    <div *ngIf=\"hookService.hookResponse.status != 200\" class=\"alert alert-danger\" role=\"alert\">\n                        <strong>Something went wrong.</strong> {{hookService.hookResponse|json}}\n                    </div>\n                    \n                </div>\n                \n            </div>\n            \n            <div class=\"col-md-4\">\n                <hook-interface-metadata></hook-interface-metadata>\n            </div>\n            \n            <div class=\"col-md-4\">\n                <hook-details></hook-details>\n            </div>\n\n        </div>\n    "
        }), 
        __metadata('design:paramtypes', [hook_service_1.HookService, router_1.ActivatedRoute, common_1.Location])
    ], HookInterfaceComponent);
    return HookInterfaceComponent;
}());
exports.HookInterfaceComponent = HookInterfaceComponent;
//# sourceMappingURL=hook-interface.component.js.map