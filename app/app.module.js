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
var platform_browser_1 = require('@angular/platform-browser');
var forms_1 = require('@angular/forms');
var app_component_1 = require('./app.component');
var hook_interface_component_1 = require('./hook-interface/hook-interface.component');
var hook_interface_form_component_1 = require('./hook-interface/hook-interface-form.component');
var hooks_component_1 = require('./hook/hooks.component');
var dashboard_component_1 = require('./dashboard.component');
var hook_service_1 = require('./hook/hook.service');
var app_routing_1 = require('./app.routing');
var http_1 = require('@angular/http');
var ng2_bootstrap_1 = require('ng2-bootstrap/ng2-bootstrap');
var hook_interface_metadata_component_1 = require("./hook-interface/hook-interface-metadata.component");
var hook_details_component_1 = require("./hook/hook-details.component");
var error_service_1 = require("./error/error.service");
var error_message_component_1 = require("./error/error-message.component");
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                app_routing_1.routing,
                http_1.HttpModule,
                ng2_bootstrap_1.TooltipModule
            ],
            declarations: [
                app_component_1.AppComponent,
                hook_interface_form_component_1.HookInterfaceFormComponent,
                hook_interface_metadata_component_1.HookInterfaceMetadataComponent,
                hook_interface_component_1.HookInterfaceComponent,
                hook_details_component_1.HookDetailsComponent,
                hooks_component_1.HooksComponent,
                error_message_component_1.ErrorMessageComponent,
                dashboard_component_1.DashboardComponent,
            ],
            providers: [
                hook_service_1.HookService,
                error_service_1.ErrorService
            ],
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map