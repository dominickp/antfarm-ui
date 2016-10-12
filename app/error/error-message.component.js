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
var error_service_1 = require("./error.service");
var ErrorMessageComponent = (function () {
    function ErrorMessageComponent(errorService) {
        this.errorService = errorService;
    }
    ErrorMessageComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'error-message',
            template: "\n        <div *ngIf=\"errorService.message\" class=\"alert alert-danger\">\n            <strong>Error!</strong> {{ errorService.message }}\n        </div>\n      ",
            styles: [],
            providers: []
        }), 
        __metadata('design:paramtypes', [error_service_1.ErrorService])
    ], ErrorMessageComponent);
    return ErrorMessageComponent;
}());
exports.ErrorMessageComponent = ErrorMessageComponent;
//# sourceMappingURL=error-message.component.js.map