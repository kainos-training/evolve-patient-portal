import {UniquePipe} from './utils/unique.pipe';
import {OrderByPipe} from './utils/orderby.pipe';
import {FilterPipe} from './utils/filter.pipe';
import { PreviousAppointmentsComponent } from './components/previous-appointments/previous-appointments.component';
import { SideEffectsComponent } from './components/side-effects/side-effects.component';
import { DependantViewComponent } from './components/dependant-view/dependant-view.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './components/app.component';
import { AlertModule } from 'ngx-bootstrap';
import { DataService } from './services/data.service';
import { HttpClientModule } from '@angular/common/http';
import { SwitchBoardService } from './services/switch-board.service';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { EllipsisPipe } from './utils/ellipsis.pipe';
import { LoginComponent } from './components/login/login.component';
import { CookieService } from 'ngx-cookie-service';
import { routes } from './app.router';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { RouteGuard } from './services/route.guard';
import { SimpleTimer } from 'ng2-simple-timer';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { LeftSideMenuComponent } from './components/left-side-menu/left-side-menu.component';
import { MapViewComponent } from './components/map-view/map-view.component';
import { AppointmentComponent } from './components/appointment/appointment.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NguiMapModule } from '@ngui/map';
import { MenuStateService } from './services/menu-state.service';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SettingNewPasswordComponent } from './components/setting-new-password/setting-new-password.component';
import { RequestPasswordResetComponent } from './components/request-password-reset/request-password-reset.component';
import { TemplateComponent } from './components/template/template.component';
import { RepeatPrescriptionComponent } from './components/repeat-prescription/repeat-prescription.component';
import { ToolTipModule } from 'angular2-tooltip';
import { PersonalInfoHeaderComponent } from './components/personal-info-header/personal-info-header.component';
import { SecondaryInfoHeaderComponent } from './components/secondary-info-header/secondary-info-header.component';
import { ReviewMedicationComponent } from './components/review-medication/review-medication.component';
import { ConditionComponent } from './components/condition/condition.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { MyTasksComponent } from './components/my-tasks/my-tasks.component';
import { AgmCoreModule } from '@agm/core';
import { QuestionnaireComponent } from './components/questionnaire/questionnaire.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { MyDatePickerModule } from 'mydatepicker';

@NgModule({
    declarations: [
        AppComponent,
        AppointmentComponent,
        DashboardComponent,
        ErrorPageComponent,
        LeftSideMenuComponent,
        LoginComponent,
        MapViewComponent,
        RequestPasswordResetComponent,
        ReviewMedicationComponent,
        SettingNewPasswordComponent,
        TopBarComponent,
        EllipsisPipe,
        RepeatPrescriptionComponent,
        UniquePipe,
        OrderByPipe,
        FilterPipe,
        PreviousAppointmentsComponent,
        QuestionnaireComponent,
        TimelineComponent,
        ConditionComponent,
        SideEffectsComponent,
        MyTasksComponent,
        PersonalInfoHeaderComponent,
        SecondaryInfoHeaderComponent,
        DependantViewComponent
    ],
    imports: [
        MyDatePickerModule,
        BrowserModule,
        FormsModule,
        HttpClientModule,
        routes,
        AlertModule.forRoot(),
        ModalModule.forRoot(),
        NguiMapModule.forRoot({ apiUrl: 'https://maps.google.com/maps/api/js?key=AIzaSyC6v7VVrChAt97hxrsY76i8Xg2mcaQMuE8' }),
        BrowserAnimationsModule,
        ToolTipModule,
        NguiMapModule.forRoot({apiUrl: 'https://maps.google.com/maps/api/js?key=AIzaSyC6v7VVrChAt97hxrsY76i8Xg2mcaQMuE8'}),
        BsDropdownModule.forRoot(),
        NguiMapModule.forRoot({ apiUrl: 'https://maps.google.com/maps/api/js?key=AIzaSyC6v7VVrChAt97hxrsY76i8Xg2mcaQMuE8' }),
        BrowserAnimationsModule,
        TooltipModule.forRoot(),
        AgmCoreModule.forRoot()

    ],
    providers: [
        UniquePipe,
        OrderByPipe,
        EllipsisPipe,
        FilterPipe,
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
