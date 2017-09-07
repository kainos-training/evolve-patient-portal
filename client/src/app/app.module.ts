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
import {routes} from './app.router';
import {ErrorPageComponent} from './error-page/error-page.component';
import {RouteGuard} from './guards/route.guard';
import {SimpleTimer} from 'ng2-simple-timer';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        ErrorPageComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        routes,
        AlertModule.forRoot()
    ],
    providers: [
        DataService,
        CookieService,
        SwitchBoardService,
        RouteGuard,
        SimpleTimer
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
