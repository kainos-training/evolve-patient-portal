import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SettingNewPasswordComponent } from './setting-new-password.component';
import {LoginComponent} from '../login/login.component';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {DataService} from '../services/data.service';
import { APP_BASE_HREF } from '@angular/common';
describe('SettingNewPasswordComponent', () => {
  const mockDataService = {resetPassword : jasmine.createSpy("resetPassword")};
  
  let component: SettingNewPasswordComponent;
  let fixture: ComponentFixture<SettingNewPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        LoginComponent,
        SettingNewPasswordComponent ],
      imports: [
        FormsModule,
        RouterModule.forRoot([{
          path: 'login',
          component: LoginComponent
        }
       
        ])
      ],
      providers: [
        {provide: DataService, useValue: mockDataService},
        {provide: APP_BASE_HREF, useValue: '/'}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingNewPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

//   it('should be created', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should reset boolean values after cancel is clicked', () => {
//     const app = fixture.debugElement.componentInstance;
//     app.cancelChangePassword();
//     expect(app.nonMatchingPasswords).toEqual(false);
//     expect(app.invalidPassword).toEqual(false);
//     expect(app.changedPassword).toEqual(false);
//   });

//   it('should reject non-matching passwords', () =>{
//     const app = fixture.debugElement.componentInstance;
//     app.newPassword = "password";
//     app.confirmNewPassword = "newPassword";
//     app.changePasswordNext();
//     expect(app.nonMatchingPasswords).toEqual(true);
//   });

//   it('should accept matching passwords', () =>{
//     const app = fixture.debugElement.componentInstance;
//     app.newPassword = "password";
//     app.confirmNewPassword = "password";
//     app.changePasswordNext();
//     expect(app.nonMatchingPasswords).toEqual(false);
//   });

//   it('should reject matching passwords without uppercase letter', () =>{
//     const app = fixture.debugElement.componentInstance;
//     app.newPassword = "password";
//     app.confirmNewPassword = "password";
//     app.changePasswordNext();
//     expect(app.hasUpperCase).toEqual(false);
//   });


//   it('should accept matching passwords with uppercase letter', () =>{
//     const app = fixture.debugElement.componentInstance;
//     app.newPassword = "Password";
//     app.confirmNewPassword = "Password";
//     app.changePasswordNext();
//     expect(app.hasUpperCase).toEqual(true);
//   });

//   it('should reject matching passwords without lowercase letter', () =>{
//     const app = fixture.debugElement.componentInstance;
//     app.newPassword = "PASSWORD";
//     app.confirmNewPassword = "PASSWORD";
//     app.changePasswordNext();
//     expect(app.hasLowerCase).toEqual(false);
//   });

//   it('should accept matching passwords with lowercase letter', () =>{
//     const app = fixture.debugElement.componentInstance;
//     app.newPassword = "Password";
//     app.confirmNewPassword = "Password";
//     app.changePasswordNext();
//     expect(app.hasLowerCase).toEqual(true);
//   });


//   it('should accept passwords that meet all the criteria', () =>{
//     const app = fixture.debugElement.componentInstance;
//     app.newPassword = "Password";
//     app.confirmNewPassword = "Password";
//     app.changePasswordNext();
//     expect(app.changedPassword).toEqual(true);
//   });






  

 


});

