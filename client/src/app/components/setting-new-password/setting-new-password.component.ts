import {Component, OnInit} from '@angular/core';
import {DataService} from '../../services/data.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Router} from '@angular/router';
import {User} from '../../class/User';

@Component({
    selector: 'evolve-setting-new-password',
    templateUrl: './setting-new-password.component.html',
    styleUrls: ['./setting-new-password.component.css']
})
export class SettingNewPasswordComponent implements OnInit {
    invalidPassword: boolean;
    nonMatchingPasswords: boolean;
    newPassword: string;
    dataService: DataService;
    confirmNewPassword: string;
    hasUpperCase: boolean;
    hasLowerCase: boolean;
    changedPassword: boolean;
    evolveLogoPath: string;
    user: User;
    noDataEntered: boolean;

    constructor(dataService: DataService, private router: Router, private route: ActivatedRoute) {
        this.evolveLogoPath = './assets/EvolveLogo.svg';
        this.invalidPassword = false;
        this.nonMatchingPasswords = false;
        this.changedPassword = false;
        this.dataService = dataService;
        this.user = new User();
        this.noDataEntered = false;
    }

    ngOnInit(): void {
        this.route.paramMap
            .switchMap((params: ParamMap) => this.dataService.getUser(params.get('id')))
            .subscribe(data => {
                this.user.userID = data['userID'];
                this.user.username = data['username'];
            }, error => {
                this.user.loggedIn = false;
                this.user.message = error['message'];
            });
        ;
    }

    changePasswordNext(): void {
        if (!this.newPassword) {
            this.noDataEntered = true;
        } else {
            this.noDataEntered = false;
        }
        this.hasUpperCase = !(this.newPassword == this.newPassword.toLowerCase());
        this.hasLowerCase = !(this.newPassword == this.newPassword.toUpperCase());

        if (this.newPassword == this.confirmNewPassword) {

            if (this.newPassword.length >= 8 && this.hasUpperCase && this.hasLowerCase) {
                this.nonMatchingPasswords = false;
                this.invalidPassword = false;
                this.user.password = this.newPassword;
                this.dataService.resetPassword(this.user);
                this.changedPassword = true;
            } else {
                this.nonMatchingPasswords = false;
                this.invalidPassword = true;
            }
        }
        else {
            this.nonMatchingPasswords = true;
        }
    }

    cancelChangePassword(): void {
        this.nonMatchingPasswords = false;
        this.invalidPassword = false;
        this.changedPassword = false;
        this.rerouteToLogin();
    }

    rerouteToLogin(): void {
        this.router.navigate(['/login']);
    }
}
