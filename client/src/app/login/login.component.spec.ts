import {async, TestBed} from '@angular/core/testing';
import {DataService} from '../services/data.service';
import {SwitchBoardService} from '../services/switch-board.service';
import {LoginComponent} from './login.component';
import {FormsModule} from '@angular/forms';

describe('LoginComponent', () => {
    const mockDataService = {};
    const mockSwitchboardService = {};

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [LoginComponent],
            providers: [
                {provide: DataService, useValue: mockDataService}, //use mock data service object
                {provide: SwitchBoardService, useValue: mockSwitchboardService}
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
