import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { DataService } from '../services/data.service'
import { User } from '../User';
import {ActivatedRoute, ParamMap} from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Router} from '@angular/router';

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

  constructor(dataService: DataService, private router: Router, private route: ActivatedRoute, private location: Location) { 
    this.evolveLogoPath = './assets/EvolveLogo.svg';
    this.invalidPassword = false;
    this.nonMatchingPasswords = false;
    this.changedPassword = false;
    this.dataService = dataService;
    this.user = new User();
    //TODO - get username from password reset request email link
    this.noDataEntered = false;
  }

  ngOnInit(): void {
    console.log("In ngOnInit in setting-new-password");
    this.route.paramMap
      .switchMap((params: ParamMap) => this.dataService.getUser(+params.get('id'), this.user))
      .subscribe(data => {
        this.user.userID = data['userID'];
        this.user.username = data['username'];
        console.log("Username is " + this.user.username);
        //this.switchBoard.switchUser(user);
    }, error => {
        this.user.loggedIn = false;
        this.user.message = error["message"];
    });;
  }

  changePasswordNext() : void {

    if(!this.newPassword) {
      this.noDataEntered = true;
    } else {
      this.noDataEntered = false;
    }
    
    this.hasUpperCase = !(this.newPassword==this.newPassword.toLowerCase());
    this.hasLowerCase = !(this.newPassword==this.newPassword.toUpperCase());

    if(this.newPassword == this.confirmNewPassword) {
      
      if(this.newPassword.length >= 8 && this.hasUpperCase && this.hasLowerCase) {
        

        //Valid password
        this.nonMatchingPasswords = false;
        this.invalidPassword = false;
        this.user.password = this.newPassword;

        this.dataService.resetPassword(this.user);

        this.changedPassword = true;
      } else {
          //Invalid password
        this.nonMatchingPasswords = false;
        this.invalidPassword = true;
      }
    }
    else {
        //Invalid password
      this.nonMatchingPasswords = true;
    }
  }

  cancelChangePassword() : void {
    this.nonMatchingPasswords = false;
    this.invalidPassword = false;
    this.changedPassword = false;
    this.rerouteToLogin();
  }

  rerouteToLogin() : void {
     this.router.navigate(['/login']);
  }
}
