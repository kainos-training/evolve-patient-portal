import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service'
import {Location} from '@angular/common';

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
  
  constructor(dataService: DataService) {
    this.dataService = dataService;
    this.invalid = false;
    this.username = '';
    this.evolveLogoPath = 'assets/kainos.jpg';
  }

  onRequestReset(): void
  {
    alert("In request-password-reset component: Username is: " + this.username);
    this.dataService.requestReset(this.username);
    this.successful = true;
    this.invalid = !(this.successful);
    alert("dataService.requestReset returned " + this.successful);
  }

  onGoBack(): void
  {
    //alert('User clicked cancel');
    //this.location.back();
  }
  ngOnInit() {
  }

}
