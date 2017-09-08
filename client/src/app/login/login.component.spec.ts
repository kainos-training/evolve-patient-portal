import {async, TestBed} from '@angular/core/testing';
import {DataService} from '../services/data.service';
import {SwitchBoardService} from '../services/switch-board.service';
import {LoginComponent} from './login.component';
import {FormsModule} from '@angular/forms';
import { ReviewMedicationComponent } from '../review-medication/review-medication.component';
import { EllipsisPipe } from '../ellipsis.pipe';
import {Router} from '@angular/router';

describe('LoginComponent', () => {
    const mockDataService = {};
    const mockSwitchboardService = {};
    const mockRouter = {};

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [LoginComponent, ReviewMedicationComponent, EllipsisPipe],
            providers: [
                {provide: DataService, useValue: mockDataService}, //use mock data service object
                {provide: SwitchBoardService, useValue: mockSwitchboardService},
                {provide: Router, useValue: mockRouter}
            ],
            imports: [
                FormsModule
            ]
        })
            .compileComponents();
    }));

    it('should create the component', async(() => {
        const fixture = TestBed.createComponent(LoginComponent);
        const component = fixture.debugElement.componentInstance;
        expect(component).toBeTruthy();
    }));

    it('should return a user no loggedIn attribute', async(() => {
        var user;
        const fixture = TestBed.createComponent(LoginComponent);
        const app = fixture.debugElement.componentInstance;
        user = app.resetUser(user);

        expect(user.loggedIn).toBeFalsy();
    }));

});
