import { Component, OnInit } from '@angular/core';
import { User } from './../user';
import { DataService } from '../services/data.service';
import {CookieService} from 'ngx-cookie-service';

@Component({
    selector: 'evolve-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    public evolveLogoPath: String;
    user: User;
    invalid: boolean;
    loggedIn: boolean;

    constructor(private data: DataService, private cookieService: CookieService) {
        this.data = data;
        this.invalid = false;
        this.loggedIn = false;
        this.evolveLogoPath = 'assets/EvolveLogo.svg';
    }

    ngOnInit() {
        this.user = new User;
        const cookieValue = this.cookieService.get("evolve-cookie");
        const cookieJSON = JSON.parse(cookieValue);

        if(cookieJSON){
            if(cookieJSON.username && cookieJSON.token){
                //    successfully logged in
                console.log("Successfully logged in using username: >>", cookieJSON.username, "<< and token: >>", cookieJSON.token ,"<<." );

                this.user.userID = cookieJSON.userID;
                this.user.username = cookieJSON.username;
                this.user.token = cookieJSON.token;
                this.loggedIn = true;
            }
        }
    }

    login() {
        this.invalid = !this.data.login(this.user);
        if (!this.invalid) {
            //redirect to dashboard
            this.loggedIn = true;

            const cookieJSON = {
                userID: 12345,
                username: this.user.username,
                token: "This is a token test."
            };
            // token: this.user.token
            // userID: this.user.userID,

            this.cookieService.set( "evolve-cookie", JSON.stringify(cookieJSON));
        }
    }

}
