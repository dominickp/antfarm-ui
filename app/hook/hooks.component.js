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
var hook_service_1 = require('./hook.service');
var error_service_1 = require("../error/error.service");
var router_1 = require("@angular/router");
var HooksComponent = (function () {
    function HooksComponent(hookService, errorService, route) {
        this.hookService = hookService;
        this.errorService = errorService;
        this.route = route;
        this.title = 'Available Hooks';
    }
    HooksComponent.prototype.ngOnInit = function () {
        var hc = this;
        hc.route.params.forEach(function (params) {
            hc.selectedServer = params['serverIndex'];
            hc.hookService.setActiveServerId(hc.selectedServer);
            hc.getHooks();
        });
    };
    HooksComponent.prototype.getHooks = function () {
        var h = this;
        h.hookService.getHooks()
            .then(function (hooks) {
            h.hooks = hooks;
            h.errorService.message = "";
        })
            .catch(function (reason) {
            h.errorService.message = "Could not load the hooks from the Antfarm server.";
        });
    };
    HooksComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'available-hooks',
            template: "\n    <div *ngIf=\"hooks\">\n      <h2>My Hooks</h2>\n        <div class=\"hooks list-group\">\n          <a *ngFor=\"let hook of hooks\" class=\"list-group-item\" \n            [class.active]=\"hook === selectedHook\"\n            href=\"/route/{{selectedServer}}/{{hook.id}}\">\n            <span class=\"badge\">{{hook.nest}}</span> {{hook.tunnel}}\n          </a>\n        </div>\n    </div>\n      ",
            styles: [],
            providers: [hook_service_1.HookService]
        }), 
        __metadata('design:paramtypes', [hook_service_1.HookService, error_service_1.ErrorService, router_1.ActivatedRoute])
    ], HooksComponent);
    return HooksComponent;
}());
exports.HooksComponent = HooksComponent;
//# sourceMappingURL=hooks.component.js.map