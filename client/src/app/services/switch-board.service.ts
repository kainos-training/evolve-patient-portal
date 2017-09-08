import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {User} from '../class/user';

@Injectable()
export class SwitchBoardService {

    constructor() { }

    private userWatcher = new Subject<User>();
    public user$ = this.userWatcher.asObservable();
    
    private validWatcher = new Subject<Boolean>();
    public valid$ = this.validWatcher.asObservable();

    private successfulWatcher = new Subject<Boolean>();
    public successful$ = this.validWatcher.asObservable();

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

}
