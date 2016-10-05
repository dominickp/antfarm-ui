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
// import { TooltipModule } from 'ng2-bootstrap/ng2-bootstrap';
var multipart_item_1 = require("../plugins/multipart-upload/multipart-item");
var multipart_uploader_1 = require("../plugins/multipart-upload/multipart-uploader");
var hook_service_1 = require('./hook.service');
var hook_1 = require('./hook');
var hook_interface_1 = require('./hook-interface');
var HookInterfaceComponent = (function () {
    function HookInterfaceComponent(hookService, route, location) {
        var _this = this;
        this.hookService = hookService;
        this.route = route;
        this.location = location;
        this.endpoint = "http://insight.dev:8081/hooks/proof/create";
        this.uploader = new multipart_uploader_1.MultipartUploader({ url: "http://insight.dev:8081/hooks/proof/create" });
        this.multipartItem = new multipart_item_1.MultipartItem(this.uploader);
        /**
         * Holds files as they are added to the form.
         * @type {Array}
         */
        this.files = [];
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
        this.active = true;
        this.submitted = false;
        this.multipartItem.withCredentials = false;
    }
    HookInterfaceComponent.prototype.upload = function (event) {
        var model = this;
        event.preventDefault();
        console.debug("home.ts & upload() ==>");
        if (model.multipartItem == null) {
            model.multipartItem = new multipart_item_1.MultipartItem(model.uploader);
        }
        if (model.multipartItem.formData == null) {
            model.multipartItem.formData = new FormData();
        }
        // Add form fields in
        model.hookInterface.fields.forEach(function (field) {
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
    HookInterfaceComponent.prototype.ngOnInit = function () { };
    HookInterfaceComponent.prototype.selectFile = function ($event) {
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
    __decorate([
        core_1.Input(), 
        __metadata('design:type', hook_interface_1.HookInterface)
    ], HookInterfaceComponent.prototype, "hookInterface", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', hook_1.Hook)
    ], HookInterfaceComponent.prototype, "hook", void 0);
    HookInterfaceComponent = __decorate([
        core_1.Component({
            selector: 'hook-interface',
            template: "\n      <div *ngIf=\"hookInterface\">\n        <form *ngIf=\"active\" (ngSubmit)=\"upload()\" #interfaceForm=\"ngForm\">\n        \n            <div *ngFor=\"let field of hookInterface.fields\" class=\"form-group\">\n            \n                <label htmlFor=\"{{field.id}}\">\n                    {{field.name}} \n                    <span *ngIf=\"field.tooltip\" [tooltip]=\"field.tooltip\" tooltipPlacement=\"right\"\n                        class=\"glyphicon glyphicon-info-sign\" ></span>\n                </label>\n                \n                <div [ngSwitch]=\"field.type\">\n                \n                    <textarea *ngSwitchCase=\"'textarea'\" class=\"form-control\" id=\"{{field.id}}\" \n                    placeholder=\"{{field.placeholder}}\" name=\"{{field.id}}\"\n                    [(ngModel)]=\"field.value\"></textarea>\n                    \n                    <input *ngSwitchCase=\"'text'\" type=\"text\" class=\"form-control\" id=\"{{field.id}}\" \n                    placeholder=\"{{field.placeholder}}\" name=\"{{field.id}}\"\n                    [(ngModel)]=\"field.value\">\n                    \n                    <select *ngSwitchCase=\"'select'\" id=\"{{field.id}}\" name=\"{{field.id}}\" class=\"form-control\">\n                      <option *ngFor=\"let value of field.acceptableValues\">{{value}}</option>\n                    </select>\n                    \n                    <div class=\"file_upload\" *ngSwitchCase=\"'file'\" >\n                        <input type=\"file\" name=\"{{field.id}}\" id=\"{{field.id}}\" class=\"form-control\" \n                            (change)=\"selectFile($event)\">\n                    </div>\n\n                    <div *ngSwitchDefault=\"\" class=\"alert alert-danger\" role=\"alert\">\n                        <strong>Error!</strong> Field type \"{{field.type}}\" is not supported.\n                    </div>\n                  \n                </div>\n                    \n                <p class=\"help-block\">{{field.description}}</p>\n                    \n            </div>\n            \n             <button class=\"btn btn-primary\" (click)=\"upload($event);\">Submit</button>\n            \n        </form>\n      </div>\n    "
        }), 
        __metadata('design:paramtypes', [hook_service_1.HookService, router_1.ActivatedRoute, common_1.Location])
    ], HookInterfaceComponent);
    return HookInterfaceComponent;
}());
exports.HookInterfaceComponent = HookInterfaceComponent;
//# sourceMappingURL=hook-interface.component.js.map