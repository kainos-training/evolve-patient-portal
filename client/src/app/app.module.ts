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

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
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
