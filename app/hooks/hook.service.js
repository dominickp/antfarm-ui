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
var multipart_item_1 = require("../plugins/multipart-upload/multipart-item");
var multipart_uploader_1 = require("../plugins/multipart-upload/multipart-uploader");
require('rxjs/add/operator/toPromise');
var HookService = (function () {
    function HookService(http) {
        var _this = this;
        this.http = http;
        this.host = "http://localhost:8081";
        this.hooks_path = '/hooks'; // URL to web api
        /**
         * Holds files as they are added to the form.
         * @type {Array}
         */
        this.files = [];
        // Upload below
        this.uploadCallback = function (data) {
            console.debug("home.ts & uploadCallback() ==>");
            _this.files = [];
            if (data) {
                console.debug("home.ts & uploadCallback() upload file success.");
            }
            else {
                console.error("home.ts & uploadCallback() upload file false.");
            }
        };
    }
    HookService.prototype.getHooks = function () {
        return this.http.get(this.host + this.hooks_path)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    // private handleError(error: any): Promise<any> {
    //     console.error('An error occurred', error); // for demo purposes only
    //     return Promise.reject(error.message || error);
    // }
    HookService.prototype.handleError = function (error) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        console.error(errMsg); // log to console instead
        return Promise.reject(errMsg);
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
    HookService.prototype.selectFile = function ($event) {
        var inputValue = $event.target;
        var theFile = inputValue.files[0];
        if (null == inputValue || null == inputValue.files[0]) {
            console.debug("Input file error.");
            return;
        }
        else {
            this.files.push(inputValue.files[0]);
            console.debug("Input File name: " + theFile.name + " type:" + theFile.type + " size:" + theFile.size);
        }
    };
    HookService.prototype.upload = function (event, hookInterface, hook) {
        var model = this;
        model.uploader = new multipart_uploader_1.MultipartUploader({ url: model.host + hook.path });
        model.multipartItem = new multipart_item_1.MultipartItem(this.uploader);
        model.multipartItem.withCredentials = false;
        model.multipartItem.method = hook.method.toUpperCase();
        // event.preventDefault();
        console.debug("home.ts & upload() ==>");
        if (model.multipartItem == null) {
            model.multipartItem = new multipart_item_1.MultipartItem(model.uploader);
        }
        if (model.multipartItem.formData == null) {
            model.multipartItem.formData = new FormData();
        }
        // Add form fields in
        hookInterface.fields.forEach(function (field) {
            if (field.type !== "file") {
                console.log("Adding to formdata", field.id, field.value);
                model.multipartItem.formData.append(field.id, field.value);
            }
        });
        // Add files in
        model.files.forEach(function (file, index) {
            model.multipartItem.formData.append("file" + index, file);
        });
        this.multipartItem.callback = this.uploadCallback;
        this.multipartItem.upload();
    };
    ;
    HookService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], HookService);
    return HookService;
}());
exports.HookService = HookService;
//# sourceMappingURL=hook.service.js.map