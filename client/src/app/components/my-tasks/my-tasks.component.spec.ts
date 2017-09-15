import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { DataService } from '../../services/data.service';
import { MyTasksComponent } from './my-tasks.component';
import { HttpClientModule, HttpClient, HttpHandler } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { SwitchBoardService } from '../../services/switch-board.service';
import { APP_BASE_HREF } from '@angular/common';
import { routes } from '../../app.router';
import { ErrorPageComponent } from '../error-page/error-page.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { SettingNewPasswordComponent } from '../setting-new-password/setting-new-password.component';
import { RequestPasswordResetComponent } from '../request-password-reset/request-password-reset.component';
import { FormsModule } from '@angular/forms';
import { TopBarComponent } from '../top-bar/top-bar.component';
import { LeftSideMenuComponent } from '../left-side-menu/left-side-menu.component';
import { AppointmentComponent } from '../appointment/appointment.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Task } from '../../class/Task';

export class MockDataService {
  getTaskList(userID: number) {
      let toReturn: Array<Task> = [];
      if (userID == 1) {
          toReturn.push(new Task('Pre-op questionnaire', new Date(2017,7,10), new Date(2017,10,15)));
          toReturn.push(new Task('Pre-op Assessment: Olanzapine', new Date(2017,6,15), new Date(2017,12,23)));
      }
      return toReturn;
  }
}

describe('MyTasksComponent', () => {
  let component: MyTasksComponent;
  let mockDataService: MockDataService;
  let fixture: ComponentFixture<MyTasksComponent>;

  beforeEach(async(() => {
    mockDataService = new MockDataService();
    TestBed.configureTestingModule({
      declarations: [ MyTasksComponent ],
      providers: [DataService, HttpClient, HttpHandler, HttpClientModule, CookieService, SwitchBoardService, {provide: APP_BASE_HREF, useValue: '/'} ],
      
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();

    TestBed.overrideComponent(MyTasksComponent, {
      set: {
          providers: [
              {provide: DataService, useClass: MockDataService}
          ]
      }
    })
    
  }));

  it('should be created', async () => {
    fixture = TestBed.createComponent(MyTasksComponent);
    component = fixture.componentInstance;
    expect(component).toBeTruthy();
});

it('should have a defined data service', async () => {
  fixture = TestBed.createComponent(MyTasksComponent);
  component = fixture.componentInstance;
  expect(mockDataService).toBeDefined();
});

it('should return 0 if the userID is not recognisable. [UserID: 0]', async () => {
  fixture = TestBed.createComponent(MyTasksComponent);
  component = fixture.componentInstance;
  let serviceResult = mockDataService.getTaskList(0);
  expect(serviceResult.length).toBe(0);
});

it('should return a result set containing Tasks the user must complete. [UserID: 1]', async () => {
  fixture = TestBed.createComponent(MyTasksComponent);
  component = fixture.componentInstance;
  let serviceResult = JSON.stringify(mockDataService.getTaskList(1));
  let status = serviceResult.includes('Pre-op questionnaire');
  expect(serviceResult.includes('Pre-op questionnaire')).toBeTruthy();
});
});
