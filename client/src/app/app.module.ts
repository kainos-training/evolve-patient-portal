import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './components/app.component';
import {AlertModule} from 'ngx-bootstrap';
import {DataService} from './services/data.service';
import {HttpClientModule} from '@angular/common/http';
import {LoginComponent} from './login/login.component';
import {FormsModule} from '@angular/forms';
import {CookieService} from 'ngx-cookie-service';
import {SwitchBoardService} from './services/switch-board.service';
import { RequestPasswordResetComponent } from './request-password-reset/request-password-reset.component';
import {RouterModule} from '@angular/router';
import {SettingNewPasswordComponent} from './setting-new-password/setting-new-password.component';


@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        RequestPasswordResetComponent,
        SettingNewPasswordComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        RouterModule.forRoot([
            {
              path: 'login',
              component: LoginComponent
            },
            {
              path: 'reset',
              component: SettingNewPasswordComponent
            },
            {
              path: '',
              redirectTo: '/reset',
              pathMatch: 'full'
          }
          ]),
        AlertModule.forRoot()
    ],
    providers: [
        DataService,
        CookieService,
        SwitchBoardService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
