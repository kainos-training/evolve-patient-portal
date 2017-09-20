import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {User} from '../class/User';
import { NavigationOption } from '../app.globals';

@Injectable()
export class SwitchBoardService {

    constructor() {
    }

    private userWatcher = new Subject<User>();
    public user$ = this.userWatcher.asObservable();

    private validWatcher = new Subject<Boolean>();
    public valid$ = this.validWatcher.asObservable();

    private successfulWatcher = new Subject<Boolean>();
    public successful$ = this.validWatcher.asObservable();

    private navigationOptionWatcher = new Subject<string>();
    public navigationOption$ = this.navigationOptionWatcher.asObservable();

    private viewingDependantWatcher = new Subject<User>();
    public viewingDependant$ = this.viewingDependantWatcher.asObservable();

    public switchUser(user: User) {
        if (user) {
            this.userWatcher.next(user);
        }
    }

    public updateValid(valid: Boolean) {
        this.validWatcher.next(valid);
    }

    public updateSuccessful(successful: Boolean) {
        this.successfulWatcher.next(successful);
    }

    public updateNavigationOption(option: NavigationOption) {
        this.navigationOptionWatcher.next(option);
    }

    public updateViewingDependant(dependant: User) {
        this.viewingDependantWatcher.next(dependant);
    }
}