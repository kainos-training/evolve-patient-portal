import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ErrorPageComponent} from './error-page/error-page.component';
import {LoginComponent} from './login/login.component';
import {RouteGuard} from './guards/route.guard';

export const router: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    {path: 'forbidden', component: ErrorPageComponent},
    {
        path: 'test',
        component: ErrorPageComponent,
        canActivate: [RouteGuard]
    },
    {path: '**', component: LoginComponent}
];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);