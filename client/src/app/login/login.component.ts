import {Component, OnInit, OnDestroy, Input} from '@angular/core';
import {User} from './../user';
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

    public evolveLogoPath: String;
    @Input() user: User;
    userSubscription: Subscription;

    constructor(private data: DataService, private switchBoard: SwitchBoardService) {
        this.evolveLogoPath = 'assets/EvolveLogo.svg';
    }

    ngOnInit(): void {
        this.userSubscription = this.switchBoard.user$.subscribe((u) => {
            this.user = u;
        });
    }

    login() {
        // function below is async
        this.data.login(this.user);
    }

    ngOnDestroy(): void {
        this.userSubscription.unsubscribe();
    }

}
