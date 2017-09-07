import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ErrorPageComponent} from './error-page/error-page.component';
import {LoginComponent} from './login/login.component';
import {RouteGuard} from './guards/route.guard';
import {DashboardComponent} from './dashboard/dashboard.component';

export const router: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    {path: 'forbidden', component: ErrorPageComponent},
    {path: 'dashboard', component: DashboardComponent, canActivate: [RouteGuard]},
    {
        path: 'test',
        component: ErrorPageComponent,
        canActivate: [RouteGuard]
    },
    {path: '**', component: LoginComponent}
];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);