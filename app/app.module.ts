import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { AppComponent }        from './app.component';
import { HookDetailComponent } from './hooks/hook-detail.component';
import { HooksComponent }     from './hooks/hooks.component';
import { DashboardComponent }     from './dashboard.component';
import { HookService }         from './hooks/hook.service';
import { routing } from './app.routing';
import { HttpModule }    from '@angular/http';



@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        routing,
        HttpModule
    ],
    declarations: [
        AppComponent,
        HookDetailComponent,
        HooksComponent,
        DashboardComponent
    ],
    providers: [
        HookService
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule {
}
