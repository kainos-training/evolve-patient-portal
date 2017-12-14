import { TimelineComponent } from "../timeline/timeline.component";
import { SecondaryInfoHeaderComponent } from '../secondary-info-header/secondary-info-header.component';
import { NavigationOption, NavigationOptionEnum } from '../../app.globals';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuStateService } from '../../services/menu-state.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { DataService } from '../../services/data.service';
import { SwitchBoardService } from '../../services/switch-board.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { TopBarComponent } from '../top-bar/top-bar.component';
import { LeftSideMenuComponent } from '../left-side-menu/left-side-menu.component';
import { MapViewComponent } from '../map-view/map-view.component';
import { AppointmentComponent } from '../appointment/appointment.component';
import { Marker, NguiMapComponent, DirectionsRenderer } from '@ngui/map/dist';
import { ReviewMedicationComponent } from '../review-medication/review-medication.component';
import { EllipsisPipe } from '../../utils/ellipsis.pipe';
import { OrderByPipe } from '../../utils/orderby.pipe';
import { UniquePipe } from '../../utils/unique.pipe';
import { FilterPipe } from '../../utils/filter.pipe';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MyTasksComponent } from '../my-tasks/my-tasks.component';
import {ConditionComponent} from '../condition/condition.component';
import {TooltipModule} from 'ngx-bootstrap/tooltip';
import { HttpClientModule } from '@angular/common/http';
import { PersonalInfoHeaderComponent } from '../personal-info-header/personal-info-header.component'; 
import { DependantViewComponent } from '../dependant-view/dependant-view.component';
import { SideEffectsComponent } from '../side-effects/side-effects.component';
import { PreviousAppointmentsComponent } from '../previous-appointments/previous-appointments.component';

describe('DashboardComponent', () => {
    let component: DashboardComponent;
    let fixture: ComponentFixture<DashboardComponent>;

    const mockRouter = {};

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                PreviousAppointmentsComponent,
                DashboardComponent,
                EllipsisPipe,
                OrderByPipe,
                UniquePipe,
                FilterPipe,
                TopBarComponent,
                LeftSideMenuComponent,
                MapViewComponent,
                AppointmentComponent,
                ReviewMedicationComponent,
                Marker,
                DirectionsRenderer,
                NguiMapComponent,
                TimelineComponent,
                ConditionComponent,
                MyTasksComponent,
                SideEffectsComponent,
                DependantViewComponent,
                PersonalInfoHeaderComponent,
                SecondaryInfoHeaderComponent,
                ConditionComponent,
                MyTasksComponent
            ],
            providers: [
                EllipsisPipe,
                OrderByPipe,
                UniquePipe,
                FilterPipe,
                SwitchBoardService,
                DataService,
                CookieService,
                { provide: Router, useValue: mockRouter },
                MenuStateService,
                ConditionComponent,
                MyTasksComponent
            ],
            imports: [
                BrowserModule,
                ModalModule.forRoot(),
                FormsModule,
                HttpClientModule,
                BrowserAnimationsModule,
                TooltipModule.forRoot()
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        })
            .compileComponents();
    });

    // it('should be created', () => {
    //     fixture = TestBed.createComponent(DashboardComponent);
    //     component = fixture.componentInstance;
    //     expect(component).toBeTruthy();
    // });

   /* it('should only MyDashboard component on init', () => {
        fixture = TestBed.createComponent(DashboardComponent);
        component = fixture.componentInstance;
        expect(component.getNavigationOption()).toEqual(NavigationOptionEnum.MyDashboard.toString());
    });*/
});
