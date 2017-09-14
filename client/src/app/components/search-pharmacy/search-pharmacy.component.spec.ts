import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPharmacyComponent } from './search-pharmacy.component';

describe('SearchPharmacyComponent', () => {
  let component: SearchPharmacyComponent;
  let fixture: ComponentFixture<SearchPharmacyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchPharmacyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchPharmacyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
