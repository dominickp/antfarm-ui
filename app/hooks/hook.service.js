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
var http_1 = require('@angular/http');
require('rxjs/add/operator/toPromise');
var HookService = (function () {
    function HookService(http) {
        this.http = http;
        this.host = "http://localhost:8081";
        this.hooks_path = '/hooks'; // URL to web api
    }
    HookService.prototype.getHooks = function () {
        return this.http.get(this.host + this.hooks_path)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    HookService.prototype.handleError = function (error) {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    // protected findHook(hook) {
    //     return hook.id === 'cherries';
    // }
    HookService.prototype.getHook = function (id) {
        return this.getHooks()
            .then(function (hooks) {
            return hooks.find(function (hook, index, hooks) {
                return hook.id == id;
            });
        });
    };
    HookService.prototype.getHookInterface = function (interface_path) {
        return this.http.get(this.host + interface_path)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    /**
     * Make hook HTTP request.
     * @param hookInterface
     */
    HookService.prototype.makeRequest = function (hookInterface, hook) {
        var fields = hookInterface.fields;
        var params = new http_1.URLSearchParams();
        fields.forEach(function (field) {
            if (field.value) {
                params.set(field.id, field.value);
            }
        });
        if (hook.method === "get") {
            return this.http.get(this.host + hook.path, { search: params })
                .toPromise()
                .then(function (response) { return response.json(); })
                .catch(this.handleError);
        }
        else if (hook.method === "post") {
            return this.http.post(this.host + hook.path, { search: params })
                .toPromise()
                .then(function (response) { return response.json(); })
                .catch(this.handleError);
        }
        else {
            throw "Unsupported HTTP method. " + hook.method.toString();
        }
    };
    HookService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], HookService);
    return HookService;
}());
exports.HookService = HookService;
//# sourceMappingURL=hook.service.js.map