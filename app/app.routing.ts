import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HooksComponent }      from './hooks/hooks.component';
import { DashboardComponent }      from './dashboard.component';
import { HookInterfaceComponent }      from './hooks/hook-interface.component';

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
        component: HookInterfaceComponent
    },
    {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
