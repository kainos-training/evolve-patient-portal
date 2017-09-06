import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {User} from '../user';

@Injectable()
export class SwitchBoardService {

    constructor() { }

    private userWatcher = new Subject<User>();
    public user$ = this.userWatcher.asObservable();

    public switchUser(user: User) {
        if (user) {
            this.userWatcher.next(user);
        }
    }

}
