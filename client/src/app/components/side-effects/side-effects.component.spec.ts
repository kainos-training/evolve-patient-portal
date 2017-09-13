import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { ConditionComponent } from '../condition/condition.component';
import { Component, OnInit } from '@angular/core';
import { Condition } from '../../class/Condition';
import { User } from '../../class/User';
import { SwitchBoardService } from '../../services/switch-board.service';
import { Subscription } from 'rxjs/Rx';
import { DataService } from '../../services/data.service';
import { HttpClientModule, HttpClient, HttpHandler } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { routes } from '../../app.router';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { LoginComponent } from '../login/login.component';
import { ErrorPageComponent } from '../error-page/error-page.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { TopBarComponent } from '../top-bar/top-bar.component';
import { LeftSideMenuComponent } from '../left-side-menu/left-side-menu.component';
import { AppointmentComponent } from '../appointment/appointment.component';
import { SettingNewPasswordComponent } from '../setting-new-password/setting-new-password.component';
import { RequestPasswordResetComponent } from '../request-password-reset/request-password-reset.component';
import { ReviewMedicationComponent } from '../review-medication/review-medication.component';
import { MapViewComponent } from '../map-view/map-view.component';
import { EllipsisPipe } from '../../utils/ellipsis.pipe';
import { Marker, NguiMapComponent, DirectionsRenderer } from '@ngui/map/dist';
import { APP_BASE_HREF } from '@angular/common';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { MyTasksComponent } from '../my-tasks/my-tasks.component';
import { SideEffectsComponent } from './side-effects.component';
import { SideEffect } from '../../class/SideEffect';

export class MockDataService {
  getUserSideEffects(userID: number) {
    let toReturn: Array<SideEffect> = [];
    if (userID == 1) {
      
    }
    return toReturn;
  }
}

describe('SideEffectsComponent', () => {
  let component: SideEffectsComponent;
  let fixture: ComponentFixture<SideEffectsComponent>;
  let mockDataService: MockDataService;

  beforeEach(async(() => {
    mockDataService = new MockDataService();
    TestBed.configureTestingModule({
        declarations: [
            ConditionComponent,
            LoginComponent,
            ErrorPageComponent,
            DashboardComponent,
            TopBarComponent,
            LeftSideMenuComponent,
            AppointmentComponent,
            SettingNewPasswordComponent,
            RequestPasswordResetComponent,
            ReviewMedicationComponent,
            MapViewComponent,
            EllipsisPipe,
            Marker,
            DirectionsRenderer,
            NguiMapComponent,
            MyTasksComponent,
            SideEffectsComponent
        ],
        providers: [
            DataService,
            HttpClient,
            HttpHandler,
            HttpClientModule,
            CookieService,
            SwitchBoardService,
            { provide: APP_BASE_HREF, useValue: '/' }
        ],
        imports: [
            routes,
            BrowserModule,
            ModalModule.forRoot(),
            FormsModule,
            TooltipModule.forRoot()
        ]
    })
        .compileComponents();
}));

  it('should be created', async() => {
    fixture = TestBed.createComponent(SideEffectsComponent);
    component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
