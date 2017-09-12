import {Component, OnInit, OnDestroy, Input} from '@angular/core';
import {User} from '../../class/User';
import {DataService} from '../../services/data.service';
import {Subscription} from 'rxjs/Subscription';
import {SwitchBoardService} from '../../services/switch-board.service';
import {Router} from '@angular/router';

@Component({
    selector: 'evolve-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    private user: User = new User();
    private userSubscription: Subscription;

    constructor(private data: DataService, private switchBoard: SwitchBoardService, private router: Router) {
    }

    ngOnInit(): void {
        this.userSubscription = this.switchBoard.user$.subscribe(user => {
            this.user = user;
        });
        
        this.data.getUserFromCookie(this.user);
        if (this.user.loggedIn) {
            this.router.navigateByUrl(this.data.dashboardURL);
        }
    }

    login() {
        this.data.login(this.user);
    }

    ngOnDestroy(): void {
        if (this.userSubscription) {
            this.userSubscription.unsubscribe();
        }
    }
}
