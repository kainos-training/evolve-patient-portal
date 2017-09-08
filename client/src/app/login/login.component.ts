import {Component, OnInit, OnDestroy, Input} from '@angular/core';
import {User} from '../class/user';
import {DataService} from '../services/data.service';
import {Subscription} from 'rxjs/Subscription';
import {SwitchBoardService} from '../services/switch-board.service';
import {Router} from '@angular/router';

@Component({
    selector: 'evolve-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    user: User;
    userSubscription: Subscription;

    constructor(private data: DataService, private switchBoard: SwitchBoardService, private router: Router) { }

    ngOnInit(): void {
        this.userSubscription = this.switchBoard.user$.subscribe((u) => {
            this.user = u;
        });
        // create a default user
        this.user = this.resetUser(this.user);
        // check for previous data stored in cookie
        this.data.getUserFromCookie(this.user);
        // if no data is found, this.user will only be subscribed to the switchboard
        if(this.user.loggedIn){
            this.router.navigateByUrl(this.data.dashboardURL);
        }
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
