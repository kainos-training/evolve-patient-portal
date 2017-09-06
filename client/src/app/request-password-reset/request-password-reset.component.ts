import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service'
import { Location } from '@angular/common';
import { User } from '../user';

@Component({
  selector: 'evolve-request-password-reset',
  templateUrl: './request-password-reset.component.html',
  styleUrls: ['./request-password-reset.component.css']
})
export class RequestPasswordResetComponent implements OnInit {

  public evolveLogoPath: string;
  invalid : boolean;
  username : string;
  dataService: DataService;
  successful: boolean;
  user: User;

  
  constructor(dataService: DataService) {
    this.user = new User();
    this.dataService = dataService;
    this.invalid = false;
    this.username = '';
    this.evolveLogoPath = 'assets/EvolveLogo.svg';
  }

  onRequestReset(): void
  {
    console.log('reaches onRequestReset() and Username is: ' + this.user.username);
    //this.dataService.requestReset(this.username);
    this.successful = true;
    this.invalid = !(this.successful);
    this.dataService.resetPass(this.user)
    //alert("dataService.requestReset returned " + this.successful);
  }

  onGoBack(): void
  {
    //alert('User clicked cancel');
    //this.location.back();
  }
  ngOnInit() {
  }

}
