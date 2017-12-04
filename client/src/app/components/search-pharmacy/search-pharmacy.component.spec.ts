import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchPharmacyComponent } from './search-pharmacy.component';
import { FormsModule } from '@angular/forms';

describe('SearchPharmacyComponent', () => {
  let component: SearchPharmacyComponent;
  let fixture: ComponentFixture<SearchPharmacyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [ SearchPharmacyComponent ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchPharmacyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch pharmacies', ()=>{
    component.getListOfLocations('Belfast').then((result: google.maps.GeocoderResult[])=>{
      expect(result.length).toBeGreaterThanOrEqual(1);
    });
  });
});