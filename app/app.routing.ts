import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HooksComponent }      from './hook/hooks.component';
import { DashboardComponent }      from './dashboard.component';
import { HookInterfaceComponent }      from './hook-interface/hook-interface.component';

const appRoutes: Routes = [
    {
        path: 'hooks/:serverIndex',
        component: HooksComponent
    },
    {
        path: 'dashboard',
        component: DashboardComponent
    },
    {
        path: 'route/:serverIndex/:id',
        component: HookInterfaceComponent
    },
    {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
