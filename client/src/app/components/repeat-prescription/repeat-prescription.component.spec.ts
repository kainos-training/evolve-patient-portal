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
import { MedicationUser } from '../../class/MedicationUser';

export class MockDataService {
    getRepeatMedication(userID: number) {
        let toReturn: Array<MedicationUser> = [];
        if (userID == 1) {
            toReturn.push(new MedicationUser(1, 1, new Date(2017, 8, 10), new Date(2017, 9, 10), '2 tablets dailly', new Date(new Date().getDate()), true, true));
            toReturn.push(new MedicationUser(1, 2, new Date(2017, 8, 10), new Date(2017, 9, 10), '1 tablet in the morning', new Date(), false, false));
            toReturn.push(new MedicationUser(1, 3, new Date(2017, 7, 10), new Date(2017, 8, 10), '2 tablets daily', new Date(new Date().getDate()), true, true));
            toReturn.push(new MedicationUser(1, 4, new Date(2017, 6, 10), new Date(2017, 7, 10), '1 tablet in the evening', new Date(), false, false));
        }
    }


}

describe('RepeatPrescriptionComponent', () => {
    let component: RepeatPrescriptionComponent;
    let fixture: ComponentFixture<RepeatPrescriptionComponent>;
    let mockDataService: MockDataService;
    let medicationUser: MedicationUser

    beforeEach(async(() => {
        mockDataService = new MockDataService();
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

        TestBed.overrideComponent(RepeatPrescriptionComponent, {
            set: {
                providers: [
                    { provide: DataService, useClass: MockDataService }
                ]
            }
        });
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RepeatPrescriptionComponent);
        component = fixture.componentInstance;
    });

    it('should be created', () => {
        fixture = TestBed.createComponent(RepeatPrescriptionComponent);
        component = fixture.componentInstance;
        expect(component).toBeTruthy();
    });

    it('should have a defined data service', async () => {
        fixture = TestBed.createComponent(RepeatPrescriptionComponent);
        component = fixture.componentInstance;
        expect(mockDataService).toBeDefined();
    });
});
