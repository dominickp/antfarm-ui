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
var HooksListComponent = (function () {
    function HooksListComponent() {
    }
    HooksListComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'my-heroes',
            template: "\n      <h2>HEROES</h2>\n      <div *ngIf=\"hero\">\n        <h3>\"{{hero.name}}\"</h3>\n        <div>\n          <label>Id: </label>{{hero.id}}</div>\n        <div>\n          <label>Name: </label>\n          <input [(ngModel)]=\"hero.name\" placeholder=\"name\"/>\n        </div>\n        <p>\n          <button (click)=\"gotoHeroes()\">Back</button>\n        </p>\n      </div>\n      ",
        }), 
        __metadata('design:paramtypes', [])
    ], HooksListComponent);
    return HooksListComponent;
}());
exports.HooksListComponent = HooksListComponent;
//# sourceMappingURL=hooks-list.component.js.map