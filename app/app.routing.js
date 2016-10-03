"use strict";
var router_1 = require('@angular/router');
var hooks_component_1 = require('./hooks/hooks.component');
var dashboard_component_1 = require('./dashboard.component');
var hook_detail_component_1 = require('./hooks/hook-detail.component');
var appRoutes = [
    {
        path: 'hooks',
        component: hooks_component_1.HooksComponent
    },
    {
        path: 'dashboard',
        component: dashboard_component_1.DashboardComponent
    },
    {
        path: 'route/:id',
        component: hook_detail_component_1.HookDetailComponent
    },
    {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
    }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map