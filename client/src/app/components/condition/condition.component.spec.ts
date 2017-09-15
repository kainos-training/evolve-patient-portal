import { TimelineComponent } from '../timeline/timeline.component';
import {SecondaryInfoHeaderComponent} from '../secondary-info-header/secondary-info-header.component';
import {PersonalInfoHeaderComponent} from '../personal-info-header/personal-info-header.component';
import {HttpClient, HttpClientModule, HttpHandler} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {routes} from '../../app.router';
import {ModalModule} from 'ngx-bootstrap/modal';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {LoginComponent} from '../login/login.component';
import {ErrorPageComponent} from '../error-page/error-page.component';
import {DashboardComponent} from '../dashboard/dashboard.component';
import {SideEffectsComponent} from '../side-effects/side-effects.component';
import {TopBarComponent} from '../top-bar/top-bar.component';
import {LeftSideMenuComponent} from '../left-side-menu/left-side-menu.component';
import {AppointmentComponent} from '../appointment/appointment.component';
import {SettingNewPasswordComponent} from '../setting-new-password/setting-new-password.component';
import {RequestPasswordResetComponent} from '../request-password-reset/request-password-reset.component';
import {ReviewMedicationComponent} from '../review-medication/review-medication.component';
import {MapViewComponent} from '../map-view/map-view.component';
import {EllipsisPipe} from '../../utils/ellipsis.pipe';
import {DirectionsRenderer, Marker, NguiMapComponent} from '@ngui/map/dist';
import {MyTasksComponent} from '../my-tasks/my-tasks.component';
import {DependantViewComponent} from '../dependant-view/dependant-view.component';
import { Condition } from '../../class/Condition';
import { TestBed } from '@angular/core/testing';
import { async } from '@angular/core/testing';
import { ConditionComponent } from './condition.component';
import { ComponentFixture } from '@angular/core/testing';
import { SwitchBoardService } from '../../services/switch-board.service';
import { DataService } from '../../services/data.service';
import { APP_BASE_HREF } from '@angular/common';
import { TooltipModule } from 'ngx-bootstrap';

export class MockDataService {
    getCurrentConditions(userID: number) {
        let toReturn: Array<Condition> = [];
        if (userID == 1) {
            toReturn.push(new Condition(2, 2, 1, "Diabetes", "http://www.nhs.uk/Conditions/Diabetes/Pages/Diabetes.aspx", new Date(1998, 4, 3), null));
            toReturn.push(new Condition(3, 4, 1, "Back Pain", "http://www.nhs.uk/conditions/back-pain/Pages/Introduction.aspx", new Date(2017, 8, 3), null));
        }
        return toReturn;
    }
    getPreviousConditions(userID: number) {
        let toReturn: Array<Condition> = [];
        if (userID == 1) {
            toReturn.push(new Condition(1, 4, 1, "Back Pain", "http://www.nhs.uk/conditions/back-pain/Pages/Introduction.aspx", new Date(2017, 7, 10), new Date(2017, 1, 15)));
        }
        return toReturn;
    }
    getCurrentConditionsInvalid(userID: number) {
        let toReturn: Array<Condition> = [];
        if (userID == 1) {
            toReturn.push(new Condition(2, 2, 1, "Diabetes", "http://www.nhs.uk/Conditions/Diabetes/Pages/Diabetes.aspx", new Date(1998, 13, 3), null));
            toReturn.push(new Condition(3, 4, 1, "Back Pain", "http://www.nhs.uk/conditions/back-pain/Pages/Introduction.aspx", new Date(2017, 8, 3), null));
        }
        return toReturn;
    }
}

describe('ConditionComponent', () => {
    let component: ConditionComponent;
    let fixture: ComponentFixture<ConditionComponent>;
    let mockDataService: MockDataService;
    let condition: Condition;

    beforeEach(async(() => {
        mockDataService = new MockDataService();
        TestBed.configureTestingModule({
            declarations: [
                ConditionComponent
            ],
            providers: [
                DataService,
                SwitchBoardService,
                { provide: APP_BASE_HREF, useValue: '/' }
            ],
            imports: [
                TooltipModule.forRoot(),
                FormsModule,
                TooltipModule.forRoot()
            ]
        })
            .compileComponents();
    }));

    it('should be created', async () => {
        fixture = TestBed.createComponent(ConditionComponent);
        component = fixture.componentInstance;
        expect(component).toBeTruthy();
    });

    it('should have a defined data service', async () => {
        fixture = TestBed.createComponent(ConditionComponent);
        component = fixture.componentInstance;
        expect(mockDataService).toBeDefined();
    });

    it('should return 0 if the userID is not recognisable in getCurrentConditions. [UserID: 0]', async () => {
        fixture = TestBed.createComponent(ConditionComponent);
        component = fixture.componentInstance;
        let serviceResult = mockDataService.getCurrentConditions(0);
        expect(serviceResult.length).toBe(0);
    });

    it('should return 0 if the userID is not recognisable in getpreviousConditions. [UserID: 0]', async () => {
        fixture = TestBed.createComponent(ConditionComponent);
        component = fixture.componentInstance;
        let serviceResult = mockDataService.getPreviousConditions(0);
        expect(serviceResult.length).toBe(0);
    });

    it('should return 0 if the userID is not recognisable in getCurrentConditions. [UserID: -0]', async () => {
        fixture = TestBed.createComponent(ConditionComponent);
        component = fixture.componentInstance;
        let serviceResult = mockDataService.getCurrentConditions(0);
        expect(serviceResult.length).toBe(0);
    });

    it('should return 0 if the userID is not recognisable in getpreviousConditions. [UserID: -0]', async () => {
        fixture = TestBed.createComponent(ConditionComponent);
        component = fixture.componentInstance;
        let serviceResult = mockDataService.getPreviousConditions(-0);
        expect(serviceResult.length).toBe(0);
    });

    it('should return a result set containing Diabetes in getCurrentConditions. [UserID: 1]', async () => {
        fixture = TestBed.createComponent(ConditionComponent);
        component = fixture.componentInstance;
        let serviceResult = JSON.stringify(mockDataService.getCurrentConditions(1));
        let status = serviceResult.includes('Diabetes');
        expect(serviceResult.includes('Diabetes')).toBeTruthy();
    });

    it('should return a result set containing Back Pain in getPreviousConditions. [UserID: 1]', async () => {
        fixture = TestBed.createComponent(ConditionComponent);
        component = fixture.componentInstance;
        let serviceResult = JSON.stringify(mockDataService.getCurrentConditions(1));
        let status = serviceResult.includes('Back Pain');
        expect(serviceResult.includes('Back Pain')).toBeTruthy();
    });

    it('should open the nhs page on Diabetes when the diabetes condition is clicked calling onNavigate.', async () => {
        fixture = TestBed.createComponent(ConditionComponent);
        component = fixture.componentInstance;
        let condition = new Condition(2, 2, 1, "Diabetes", "http://www.nhs.uk/Conditions/Diabetes/Pages/Diabetes.aspx", new Date(1998, 4, 3), null);
        component.onNavigate(condition);
        expect(window.open).toHaveBeenCalled();
        expect(window.open).toHaveBeenCalledWith("http://www.nhs.uk/Conditions/Diabetes/Pages/Diabetes.aspx");
    });

    it('should open a not found page if the clicked condition doesnt have a valid url when calling onNavigate', async () => {
        fixture = TestBed.createComponent(ConditionComponent);
        component = fixture.componentInstance;
        let condition = new Condition(2, 2, 1, "Diabetes", "notalink", new Date(1998, 4, 3), null);
        component.onNavigate(condition);
        expect(window.open).toHaveBeenCalled();
        expect(window.open).toHaveBeenCalledWith("http://localhost:9876/notalink");
    });
    
});
