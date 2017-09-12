import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DataService } from '../../services/data.service';
import { RepeatPrescriptionComponent } from './repeat-prescription.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { SwitchBoardService } from '../../services/switch-board.service';
import { RouterModule } from '@angular/router';
import { routes } from '../../app.router';
import { LoginComponent } from '../../components/login/login.component';
import { ErrorPageComponent } from '../../components/error-page/error-page.component';
import { SettingNewPasswordComponent } from '../../components/setting-new-password/setting-new-password.component';
import { DashboardComponent } from '../../components/dashboard/dashboard.component';
import { RequestPasswordResetComponent } from '../../components/request-password-reset/request-password-reset.component';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';

describe('RepeatPrescriptionComponent', () => {
    let component: RepeatPrescriptionComponent;
    let fixture: ComponentFixture<RepeatPrescriptionComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [RepeatPrescriptionComponent, LoginComponent, ErrorPageComponent, DashboardComponent,
                RequestPasswordResetComponent, SettingNewPasswordComponent],
            providers: [DataService, HttpClient, HttpHandler, CookieService, SwitchBoardService, RouterModule, { provide: APP_BASE_HREF, useValue: '/' }],
            imports: [
                routes,
                ModalModule.forRoot(),
                FormsModule
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RepeatPrescriptionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
