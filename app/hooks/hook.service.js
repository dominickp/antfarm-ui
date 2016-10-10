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
        this.uploadCallback = function (data, status) {
            var response = JSON.parse(data);
            response.status = status;
            _this.hookResponse = response;
            console.debug("home.ts & uploadCallback() ==>");
            _this.files = [];
            if (data) {
                console.debug("home.ts & uploadCallback() upload file success.");
                console.log(data);
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
    HookService.prototype.loadHook = function (id) {
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
            .then(function (response) {
            var hi = response.json();
            return hi;
        })
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
    HookService.prototype.serializeHookInterface = function (sessionId, fields) {
        var fieldsParam = [];
        fields.forEach(function (field) {
            var fieldObj = {
                id: field.id,
                value: field.value
            };
            fieldsParam.push(fieldObj);
        });
        var str = [];
        fieldsParam.forEach(function (field) {
            str.push(encodeURIComponent(field.id) + "=" + encodeURIComponent(field.value));
        });
        return "?sessionId=" + sessionId + "&" + str.join("&");
    };
    HookService.prototype.upload = function (event, hookRequest, callback) {
        if (hookRequest === void 0) { hookRequest = true; }
        var model = this;
        var hookInterface = model.getInterface();
        var hook = model.getHook();
        // If GET, serialize interface values into URL
        var queryString = "";
        // Determine request URL
        var requestUrl, requestMethod;
        if (hookRequest === true) {
            requestMethod = hook.method.toUpperCase();
            if (hook.method.toUpperCase() === "GET") {
                queryString = model.serializeHookInterface(hookInterface.sessionId, hookInterface.fields);
            }
            requestUrl = model.host + hook.path + queryString;
        }
        else {
            queryString = model.serializeHookInterface(hookInterface.sessionId, hookInterface.fields);
            requestUrl = model.host + hook.interface_path + queryString;
            requestMethod = "GET";
        }
        model.uploader = new multipart_uploader_1.MultipartUploader({ url: requestUrl });
        model.multipartItem = new multipart_item_1.MultipartItem(this.uploader);
        model.multipartItem.withCredentials = false;
        model.multipartItem.method = requestMethod;
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
        if (callback) {
            this.multipartItem.callback = callback;
        }
        else {
            this.multipartItem.callback = this.uploadCallback;
        }
        this.multipartItem.upload();
    };
    ;
    HookService.prototype.setInterface = function (i) {
        this.hookInterface = i;
    };
    HookService.prototype.getInterface = function () {
        return this.hookInterface;
    };
    HookService.prototype.setHook = function (h) {
        this.hook = h;
    };
    HookService.prototype.getHook = function () {
        return this.hook;
    };
    HookService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], HookService);
    return HookService;
}());
exports.HookService = HookService;
//# sourceMappingURL=hook.service.js.map