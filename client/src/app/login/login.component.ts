import {Component, OnInit, OnDestroy, Input} from '@angular/core';
import {User} from '../class/user';
import {DataService} from '../services/data.service';
import {CookieService} from 'ngx-cookie-service';
import {Subscription} from 'rxjs/Subscription';
import {SwitchBoardService} from '../services/switch-board.service';

@Component({
    selector: 'evolve-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    user: User;
    userSubscription: Subscription;

    constructor(private data: DataService, private switchBoard: SwitchBoardService) { }

    ngOnInit(): void {
        this.userSubscription = this.switchBoard.user$.subscribe((u) => {
            this.user = u;
        });
        // create a default user
        this.user = this.resetUser(this.user);
        // check for previous data stored in cookie
        this.data.getUserFromCookie(this.user);
        // if no data is found, this.user will only be subscribed to the switchboard
    }

    login() {
        // function below is async
        this.data.login(this.user);
    }

    ngOnDestroy(): void {
        this.userSubscription.unsubscribe();
    }

    resetUser(user): User {
        user = new User();

        return user;
    }

    logout() {
        // make sure it will redirect to login page
        this.data.removeCookie();
        this.ngOnInit();
    }
}
