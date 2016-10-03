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
    function HookDetailComponent(heroService, route, location) {
        this.heroService = heroService;
        this.route = route;
        this.location = location;
    }
    HookDetailComponent.prototype.ngOnInit = function () {
        this.route.params.forEach(function (params) {
            var id = +params['id'];
            // this.heroService.getHero(id)
            //     .then(hero => this.hero = hero);
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', hook_1.Hook)
    ], HookDetailComponent.prototype, "hero", void 0);
    HookDetailComponent = __decorate([
        core_1.Component({
            selector: 'my-hero-detail',
            template: "\n      <div *ngIf=\"hero\">\n        <h2>{{hero.path}} details!</h2>\n        <div><label>id: </label>{{hero.id}}</div>\n        <div>\n          <label>name: </label>\n          <input [(ngModel)]=\"hero.name\" placeholder=\"name\"/>\n        </div>\n      </div>\n    "
        }), 
        __metadata('design:paramtypes', [hook_service_1.HookService, router_1.ActivatedRoute, common_1.Location])
    ], HookDetailComponent);
    return HookDetailComponent;
}());
exports.HookDetailComponent = HookDetailComponent;
//# sourceMappingURL=hook-detail.component.js.map