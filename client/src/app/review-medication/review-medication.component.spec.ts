import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from '../components/app.component';
import { AlertModule } from "ngx-bootstrap";
import { DataService } from "../services/data.service";
import { HttpClientModule, HttpClient, HttpHandler } from "@angular/common/http";
import { ReviewMedicationComponent } from '../review-medication/review-medication.component';
import { SwitchBoardService } from '../services/switch-board.service';
import { ModalModule } from 'ngx-bootstrap/modal';
import { EllipsisPipe } from '../ellipsis.pipe';
import { LoginComponent } from '../login/login.component';
import { CookieService } from 'ngx-cookie-service';
import { routes } from '../app.router';
import { ErrorPageComponent } from '../error-page/error-page.component';
import { RouteGuard } from '../guards/route.guard';
import { SimpleTimer } from 'ng2-simple-timer';
import { TopBarComponent } from '../top-bar/top-bar.component';
import { LeftSideMenuComponent } from '../left-side-menu/left-side-menu.component';
import { MapViewComponent } from '../map-view/map-view.component';
import { AppointmentComponent } from '../components/appointment/appointment.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NguiMapModule } from '@ngui/map';
import { MenuStateService } from '../services/menu-state.service';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { Medication } from '../Medication';
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { BsModalService } from 'ngx-bootstrap/modal';
import { SettingNewPasswordComponent } from '../setting-new-password/setting-new-password.component';
import { RequestPasswordResetComponent } from '../request-password-reset/request-password-reset.component';

export class MockDataService {

    getMedicationList(userID: number) {
        let toReturn: Array<Medication> = [];

        if (userID == 1) {
            toReturn.push(new Medication(1, 'Mood Stabilizer', new Date(2017, 2, 12), new Date(2017, 3, 12), 'Take 1 daily'));
            toReturn.push(new Medication(1, 'Antibiotics', new Date(2017, 3, 13), new Date(2017, 4, 11), 'Take 2 daily'));
        }

        return toReturn;
    }
}

describe('ReviewMedicationComponent', () => {
    let component: ReviewMedicationComponent;
    let fixture: ComponentFixture<ReviewMedicationComponent>;
    let mockDataService: MockDataService;
    let medication: Medication;

    beforeEach(async(() => {
        mockDataService = new MockDataService();
        TestBed.configureTestingModule({
            declarations: [ReviewMedicationComponent, EllipsisPipe, LoginComponent, ErrorPageComponent, DashboardComponent, LeftSideMenuComponent, TopBarComponent, AppointmentComponent, SettingNewPasswordComponent, RequestPasswordResetComponent],
            providers: [DataService, HttpClient, HttpHandler, HttpClientModule, BsModalService, CookieService, SwitchBoardService, RouteGuard],
            imports: [
                routes,
                ModalModule.forRoot(),
                BrowserModule,
                HttpClientModule,
                FormsModule,
                AlertModule.forRoot()
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        })
            .compileComponents();

        TestBed.overrideComponent(ReviewMedicationComponent, {
            set: {
                providers: [
                    { provide: DataService, useClass: MockDataService }
                ]
            }
        })
    }));

    it('should be created', async () => {
        fixture = TestBed.createComponent(ReviewMedicationComponent);
        component = fixture.componentInstance;
        expect(component).toBeTruthy();
    });

    it('should have a defined data service', async() => {
        fixture = TestBed.createComponent(ReviewMedicationComponent);
        component = fixture.componentInstance;
        expect(mockDataService).toBeDefined();
    });

    it('should return 0 if the userID is not recognisable. [UserID: 0]', async () => {
         fixture = TestBed.createComponent(ReviewMedicationComponent);
         component = fixture.componentInstance;
         let serviceResult = mockDataService.getMedicationList(0);
         expect(serviceResult.length).toBe(0);
    });

    it('should return a result set containing antibiotics. [UserID: 1]', async () => {
         fixture = TestBed.createComponent(ReviewMedicationComponent);
         component = fixture.componentInstance;
          let serviceResult = JSON.stringify(mockDataService.getMedicationList(1));
          let status = serviceResult.includes("Antibiotics");
         expect(serviceResult.includes("Antibiotics")).toBeTruthy();
    });
});
