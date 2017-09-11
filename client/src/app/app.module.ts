import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './components/app.component';
import { AlertModule } from "ngx-bootstrap";
import { DataService } from "./services/data.service";
import { HttpClientModule } from "@angular/common/http";
import { ReviewMedicationComponent } from './review-medication/review-medication.component';
import { SwitchBoardService } from './services/switch-board.service';
import { ModalModule } from 'ngx-bootstrap/modal';
import { EllipsisPipe } from './ellipsis.pipe';
import { LoginComponent } from './login/login.component';
import { CookieService } from 'ngx-cookie-service';
import { routes } from './app.router';
import { ErrorPageComponent } from './error-page/error-page.component';
import { RouteGuard } from './guards/route.guard';
import { SimpleTimer } from 'ng2-simple-timer';
import {TopBarComponent} from './top-bar/top-bar.component';
import {LeftSideMenuComponent} from './left-side-menu/left-side-menu.component';
import {MapViewComponent} from './map-view/map-view.component';
import {AppointmentComponent} from './components/appointment/appointment.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NguiMapModule} from '@ngui/map';
import {MenuStateService} from './services/menu-state.service';
import {DashboardComponent} from './dashboard/dashboard.component';
import {SettingNewPasswordComponent} from './setting-new-password/setting-new-password.component';
import {RequestPasswordResetComponent} from './request-password-reset/request-password-reset.component';
import { TemplateComponent } from './components/template/template.component';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        ErrorPageComponent,
        ReviewMedicationComponent,
        EllipsisPipe,
        TopBarComponent,
        LeftSideMenuComponent,
        MapViewComponent,
        AppointmentComponent,
        DashboardComponent,
        SettingNewPasswordComponent,
        RequestPasswordResetComponent,
        TemplateComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        routes,
        AlertModule.forRoot(),
        ModalModule.forRoot(),
        NguiMapModule.forRoot({apiUrl: 'https://maps.google.com/maps/api/js?key=AIzaSyC6v7VVrChAt97hxrsY76i8Xg2mcaQMuE8'}),
        BrowserAnimationsModule
    ],
    providers: [DataService,
        SwitchBoardService,
        DataService,
        CookieService,
        SwitchBoardService,
        RouteGuard,
        SimpleTimer,
        MenuStateService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
