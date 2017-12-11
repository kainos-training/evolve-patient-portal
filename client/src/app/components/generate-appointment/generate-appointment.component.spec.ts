import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateAppointmentComponent } from './generate-appointment.component';

describe('GenerateAppointmentComponent', () => {
  let component: GenerateAppointmentComponent;
  let fixture: ComponentFixture<GenerateAppointmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerateAppointmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
