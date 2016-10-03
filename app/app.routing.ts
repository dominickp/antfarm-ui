import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HooksComponent }      from './hooks/hooks.component';
import { DashboardComponent }      from './dashboard.component';
import { HookDetailComponent }      from './hooks/hook-detail.component';

const appRoutes: Routes = [
    {
        path: 'hooks',
        component: HooksComponent
    },
    {
        path: 'dashboard',
        component: DashboardComponent
    },
    {
        path: 'route/:id',
        component: HookDetailComponent
    },
    {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
