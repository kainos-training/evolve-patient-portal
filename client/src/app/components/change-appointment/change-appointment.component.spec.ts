import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangeAppointmentComponent } from './change-appointment.component';

describe('GenerateAppointmentComponent', () => {
  let component: ChangeAppointmentComponent;
  let fixture: ComponentFixture<ChangeAppointmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeAppointmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should be created', () => {
  //   expect(component).toBeTruthy();
  // });
});