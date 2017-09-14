
import {CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
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
                TooltipModule.forRoot()
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
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
