import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { AppComponent }        from './app.component';
import { HookInterfaceComponent } from './hook-interface/hook-interface.component';
import { HookInterfaceFormComponent } from './hook-interface/hook-interface-form.component';
import { HooksComponent }     from './hook/hooks.component';
import { DashboardComponent }     from './dashboard.component';
import { HookService }         from './hook/hook.service';
import { routing } from './app.routing';
import { HttpModule }    from '@angular/http';
import { TooltipModule } from 'ng2-bootstrap/ng2-bootstrap';
import {HookInterfaceMetadataComponent} from "./hook-interface/hook-interface-metadata.component";
import {HookDetailsComponent} from "./hook/hook-details.component";
import {ErrorService} from "./error/error.service";
import {ErrorMessageComponent} from "./error/error-message.component";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        routing,
        HttpModule,
        TooltipModule
    ],
    declarations: [
        AppComponent,
        HookInterfaceFormComponent,
        HookInterfaceMetadataComponent,
        HookInterfaceComponent,
        HookDetailsComponent,
        HooksComponent,
        ErrorMessageComponent,
        DashboardComponent,
    ],
    providers: [
        HookService,
        ErrorService
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule {
}
