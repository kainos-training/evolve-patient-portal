import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { User } from '../user';
import { RequestPasswordResetComponent } from './request-password-reset.component';

describe('RequestPasswordResetComponent', () => {
  let component: RequestPasswordResetComponent;
  let fixture: ComponentFixture<RequestPasswordResetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestPasswordResetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestPasswordResetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('valid should be false with wrong email address', () => {
     const app = fixture.debugElement.componentInstance;
     app.user.username = "username1";
     app.onRequestReset();
     expect(app.valid).toEqual(false);
  });

  it('should display invalid username message', () => {
    const app = fixture.debugElement.componentInstance;
    app.user.username = "username1";
    app.valid = app.onRequestReset();
    fixture.detectChanges();
    expect(app.valid).toEqual(false);
 });

 class MockDataService {
  
      public login(user: User): boolean {
          console.log("Requesting Password reset...")
          //call method from express server
          //For testing!
          if(user.username == "kfox"){
            console.log("Password reset email sent");
            return true;
          }
          console.log("log in failed");
          return false;
      }
  }
});
