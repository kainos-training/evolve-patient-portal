import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import {DataService} from "../services/data.service";

import { LoginComponent } from './login.component';
import { User } from './../User';

import { FormsModule } from '@angular/forms';

import {CookieService} from 'ngx-cookie-service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      providers: [
        {provide: DataService, useClass: MockDataService }
    ],
    imports: [
        FormsModule
    ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should log in user with correct credentials', async(() => {
    
    const app = fixture.debugElement.componentInstance;
   
    app.user.username = "username";
    app.user.password = "Password";
    app.login();
    expect(app.loggedIn).toEqual(true);
  }));

  it('should not log in user with incorrect username credential', async(() => {
    
    const app = fixture.debugElement.componentInstance;
   
    app.user.username = "username1";
    app.user.password = "Password";
    app.login();
    expect(app.loggedIn).toEqual(false);
  }));

  it('should not log in user with incorrect password credential', async(() => {
    
    const app = fixture.debugElement.componentInstance;
   
    app.user.username = "username";
    app.user.password = "Password1";
    app.login();
    expect(app.loggedIn).toEqual(false);
  }));

  it('should not log in user with incorrect credentials', async(() => {
    
    const app = fixture.debugElement.componentInstance;
   
    app.user.username = "username1";
    app.user.password = "Password1";
    app.login();
    expect(app.loggedIn).toEqual(false);
  }));

});

class MockDataService {

    public login(user: User): boolean {
        console.log("Logging in...")
        //call method from express server
        //For testing!
        if(user.username == "username"){
            if(user.password == "Password"){
                console.log("log in successful");
                return true;
            }
        }
        console.log("log in failed");
        return false;
    }
}

