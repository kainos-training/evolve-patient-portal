import {TestBed, inject} from '@angular/core/testing';
import {DataService} from './data.service';
import {HttpClientModule} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {SwitchBoardService} from './switch-board.service';
import {User} from '../user';
import {Router} from '@angular/router';

describe('DataService', () => {

    const mockCookieService = {};
    const mockSwitchBoardService = {};
    const mockRouter = {};
    const mockHttp = {};

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports:[
                HttpClientModule
            ],
            providers: [
                DataService,
                {provide: CookieService, useValue: mockCookieService},
                {provide: SwitchBoardService, useValue: mockSwitchBoardService},
                {provide: Router, useValue: mockRouter}
            ]
        });
    });

    it('should be created', inject([DataService], (service: DataService) => {
        expect(service).toBeTruthy();
    }));

    it('should map data to user', inject([DataService], (service: DataService) => {
        var user = new User();
        const data = {
            userID: 12345,
            token: "Token test.",
            message: "Successful login."
        };
        user = service.mapDataToUser(user, data);
        expect(user.loggedIn && user.userID && user.token && user.message).toBeTruthy();
    }));

    it('should not map data to user because token is not valid', inject([DataService], (service: DataService) => {
        var user = new User();
        const data = {
            userID: 12345,
            token: "",
            message: "Successful login."
        };
        user = service.mapDataToUser(user, data);
        expect(user.loggedIn && user.userID && user.token && user.message).toBeFalsy();
    }));

    it('should not map data to user because data is an empty object', inject([DataService], (service: DataService) => {
        var user = new User();
        const data = {};
        user = service.mapDataToUser(user, data);
        expect(user.loggedIn && user.userID && user.token && user.message).toBeFalsy();
    }));

    it('should map error to user', inject([DataService], (service: DataService) => {
        var user = new User();
        const error = {
            message: "Invalid credentials."
        };
        user = service.mapErrorToUser(user, error);
        expect(!user.loggedIn && user.message).toBeTruthy();
    }));

    it('user should not be able to login if the error object is empty', inject([DataService], (service: DataService) => {
        var user = new User();
        const error = {};
        user = service.mapErrorToUser(user, error);
        expect(user.loggedIn).toBeFalsy();
    }));

});
