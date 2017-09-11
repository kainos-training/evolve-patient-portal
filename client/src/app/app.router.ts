import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ErrorPageComponent} from './components/error-page/error-page.component';
import {LoginComponent} from './components/login/login.component';
import {RouteGuard} from './services/route.guard';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {SettingNewPasswordComponent} from './components/setting-new-password/setting-new-password.component';
import {RequestPasswordResetComponent} from './components/request-password-reset/request-password-reset.component';

export const router: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    {path: 'forbidden', component: ErrorPageComponent},
    {path: 'dashboard', component: DashboardComponent, canActivate: [RouteGuard]},
    {path: 'reset/:id', component: SettingNewPasswordComponent},
    {path: 'request-reset', component: RequestPasswordResetComponent},
    {path: '**', component: LoginComponent}
];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);