import {Component, OnInit} from '@angular/core';
import {DataService} from '../services/data.service';
import * as $ from 'jquery';
import {User} from '../user';
import {SwitchBoardService} from '../services/switch-board.service';


@Component({
    selector: 'evolve-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    user: User;

    constructor(private data: DataService, private switchBoard: SwitchBoardService) {
        // $(function() {
        //     console.log('jquery is working');
        // });
    }

    ngOnInit(): void {
        // create a default user
        this.resetUser();
        // check for previous data stored in cookie
        this.data.getUserFromCookie(this.user);
        // if no data is found, this.user will only be subscribed to the switchboard
    }

    resetUser() {
        this.user = new User();
        this.user.loggedIn = false;
    }

    logout() {
        // make sure it will redirect to login page

        this.data.removeCookie();
        this.ngOnInit();
    }
}
