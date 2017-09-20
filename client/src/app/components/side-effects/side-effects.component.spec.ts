import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AlertModule } from 'ngx-bootstrap';
import { DataService } from '../../services/data.service';
import { HttpClientModule, HttpClient, HttpHandler } from '@angular/common/http';
import { SideEffectsComponent } from './side-effects.component';
import { SwitchBoardService } from '../../services/switch-board.service';
import { ModalModule } from 'ngx-bootstrap/modal';
import { EllipsisPipe } from '../../utils/ellipsis.pipe';
import { LoginComponent } from '../login/login.component';
import { CookieService } from 'ngx-cookie-service';
import { routes } from '../../app.router';
import { ErrorPageComponent } from '../error-page/error-page.component';
import { RouteGuard } from '../../services/route.guard';
import { TopBarComponent } from '../top-bar/top-bar.component';
import { LeftSideMenuComponent } from '../left-side-menu/left-side-menu.component';
import { AppointmentComponent } from '../appointment/appointment.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { SideEffect } from '../../class/SideEffect';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BsModalService } from 'ngx-bootstrap/modal';
import { SettingNewPasswordComponent } from '../setting-new-password/setting-new-password.component';
import { RequestPasswordResetComponent } from '../request-password-reset/request-password-reset.component';
import { APP_BASE_HREF } from '@angular/common';
import { User } from '../../class/User';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { RepeatPrescriptionComponent } from '../repeat-prescription/repeat-prescription.component';

export class MockDataService {
    userSideEffects: Array<SideEffect>;
    constructor() {
        this.userSideEffects = new Array<SideEffect>();
        this.userSideEffects.push(new SideEffect(1, 1, "Headaches", "", false));
    }
    getCookie() {
        return "1";
    }

    getUserSideEffects(userID: number) {
        if (userID == 1) {
            return this.userSideEffects
        }
        return [];
    }
    addUserSideEffect(userID: number, commentText: String) {
        this.userSideEffects.push(new SideEffect(2, userID, commentText, "", false));
    }
}

export class MockSwitchboardService {
    getUser(userID: number) {
        let u: User;
        return u;
    }
}

export class MockBSModalService {
    show() {
        return new BsModalRef();
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
                SideEffectsComponent,
                EllipsisPipe,
                LoginComponent,
                ErrorPageComponent,
                DashboardComponent,
                SettingNewPasswordComponent,
                RequestPasswordResetComponent,
                RepeatPrescriptionComponent
                ],
            providers: [
                DataService,
                
                { provide: APP_BASE_HREF, useValue: '/' }],
            imports: [
                ModalModule.forRoot(),
                FormsModule,
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        })
            .compileComponents();
    }));

    TestBed.overrideComponent(SideEffectsComponent, {
        set: {
            providers: [
                { provide: DataService, useClass: MockDataService },
                { provide: SwitchBoardService, useClass: MockSwitchboardService },
                { provide: BsModalService, useClass: MockBSModalService }
            ]
        }
    });

    it('should be created', async () => {
        fixture = TestBed.createComponent(SideEffectsComponent);
        component = fixture.componentInstance;
        expect(component).toBeTruthy();
    });

    it('should get the cookie from the data service', async () => {
        fixture = TestBed.createComponent(SideEffectsComponent);
        component = fixture.componentInstance;
        expect(this.mockDataService.getCookie()).toBe("1");
    });

    it('should change showSideEffects boolean from true to false', async () => {
        fixture = TestBed.createComponent(SideEffectsComponent);
        component = fixture.componentInstance;
        component.showSideEffects = true;
        component.selectShowSideEffects();
        expect(component.showSideEffects).toBe(false);
    });

});
