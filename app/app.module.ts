import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { AppComponent }        from './app.component';
import { HookDetailComponent } from './hooks/hook-detail.component';
import { HookInterfaceComponent } from './hooks/hook-interface.component';
import { HooksComponent }     from './hooks/hooks.component';
import { DashboardComponent }     from './dashboard.component';
import { HookService }         from './hooks/hook.service';
import { routing } from './app.routing';
import { HttpModule }    from '@angular/http';
import { TooltipModule } from 'ng2-bootstrap/ng2-bootstrap';
import {HookInterfaceMetadataComponent} from "./hooks/hook-interface-metadata.component";
import {HookDetailsComponent} from "./hooks/hook-details.component";

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
        HookInterfaceComponent,
        HookInterfaceMetadataComponent,
        HookDetailComponent,
        HookDetailsComponent,
        HooksComponent,
        DashboardComponent,
    ],
    providers: [
        HookService
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule {
}
