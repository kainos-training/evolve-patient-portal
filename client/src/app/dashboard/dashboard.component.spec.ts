import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import {TopBarComponent} from '../top-bar/top-bar.component';
import {LeftSideMenuComponent} from '../left-side-menu/left-side-menu.component';
import {MapViewComponent} from '../map-view/map-view.component';
import {Appointment} from '../class/appointment';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
          DashboardComponent,
          TopBarComponent,
          LeftSideMenuComponent,
          MapViewComponent,
          Appointment
      ]
    })
    .compileComponents();
  }));

  // it('should be created', async () => {
  //     fixture = TestBed.createComponent(DashboardComponent);
  //     component = fixture.componentInstance;
  //     expect(component).toBeTruthy();
  // });
});
