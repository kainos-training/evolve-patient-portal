import {TestBed, async, inject} from '@angular/core/testing';
import {RouteGuard} from './route.guard';
import {DataService} from '../services/data.service';
import {SwitchBoardService} from '../services/switch-board.service';
import {Router} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {Observable} from 'rxjs/Observable';

describe('RouteGuard', () => {
    var mockUser = {
        subscribe: jasmine.createSpy("subscribe")
    };

    var mockSwitchBoard = {
        user$: mockUser
    };

    var mockData = {
        saveRedirectCookie: jasmine.createSpy("saveRedirectCookie"),
        getUserFromCookie: jasmine.createSpy("getUserFromCookie")
    };

    beforeEach(async () => {
        TestBed.configureTestingModule({
            providers: [
                RouteGuard,
                {provide: SwitchBoardService, useValue: mockSwitchBoard},
                {provide: DataService, useValue: mockData}
            ],
            imports: [RouterTestingModule]
        });
    });

    it('checks guard for a default user', async(inject([RouteGuard, Router], (guard, router) => {
            spyOn(router, 'navigateByUrl');

            expect(guard.canActivate({},{})).toBeFalsy();
            expect(router.navigateByUrl).toHaveBeenCalledWith('/forbidden');
        })
    ));
});
