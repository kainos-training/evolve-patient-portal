import { Component, OnInit } from '@angular/core';
import { User } from './../user';
import { DataService } from '../services/data.service';

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

    constructor(private data: DataService) {
        this.data = data;
        this.invalid = false;
        this.loggedIn = false;
        this.evolveLogoPath = 'assets/EvolveLogo.svg';
    }

    ngOnInit() {
        this.user = new User;
    }

    login() {
        this.invalid = !this.data.login(this.user);
        if (!this.invalid) {
            //redirect to dashboard
            this.loggedIn = true;
        }
    }

}
