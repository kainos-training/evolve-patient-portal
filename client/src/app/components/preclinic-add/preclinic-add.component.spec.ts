import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreclinicAddComponent } from './preclinic-add.component';

describe('PreclinicAddComponent', () => {
  let component: PreclinicAddComponent;
  let fixture: ComponentFixture<PreclinicAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreclinicAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreclinicAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
