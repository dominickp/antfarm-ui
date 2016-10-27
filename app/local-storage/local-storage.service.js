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
var LocalStorageService = (function () {
    function LocalStorageService() {
    }
    LocalStorageService.prototype.save = function (name, data) {
        var localData = localStorage.getItem('antfarm-ui');
        if (localData) {
            localData = JSON.parse(localData);
        }
        else {
            localData = {};
        }
        localData[name] = data;
        localStorage.setItem('antfarm-ui', JSON.stringify(localData));
    };
    LocalStorageService.prototype.get = function (name) {
        var data = JSON.parse(localStorage.getItem('antfarm-ui'));
        if (!data) {
            return undefined;
        }
        if (name) {
            if (data[name]) {
                return data[name];
            }
            else {
                return {};
            }
        }
        return data;
    };
    LocalStorageService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], LocalStorageService);
    return LocalStorageService;
}());
exports.LocalStorageService = LocalStorageService;
//# sourceMappingURL=local-storage.service.js.map