import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepeatPrescriptionComponent } from './repeat-prescription.component';

describe('RepeatPrescriptionComponent', () => {
  let component: RepeatPrescriptionComponent;
  let fixture: ComponentFixture<RepeatPrescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepeatPrescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepeatPrescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
