import { Component, OnInit } from '@angular/core';
import { User } from './../user'
import {DataService} from "../services/data.service";

@Component({
  selector: 'evolve-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User;
  invalid: boolean;
  constructor(private data: DataService) { 
      this.data = data;
      this.invalid = false;
  }

  ngOnInit() {
    this.user = new User;
  }

  login(){
      this.invalid = !this.data.login(this.user);
      if(!this.invalid){
          //redirect to dashboard
      }
  }

}
