import { EllipsisPipe } from '../../utils/ellipsis.pipe';
import { FormsModule } from '@angular/forms';
import { DirectionsRenderer, NguiMapComponent,  Marker} from '@ngui/map';
import { MapViewComponent} from '../map-view/map-view.component';
import { AppointmentComponent } from '../appointment/appointment.component';
import { Router } from '@angular/router';
import { SwitchBoardService } from '../../services/switch-board.service';
import { CookieService } from 'ngx-cookie-service';
import { HttpClientModule } from '@angular/common/http';
import { DataService } from '../../services/data.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReviewMedicationComponent } from '../review-medication/review-medication.component';
import { RepeatPrescriptionComponent } from  '../repeat-prescription/repeat-prescription.component';
import { SearchPharmacyComponent } from '../search-pharmacy/search-pharmacy.component';
import { PersonalInfoHeaderComponent } from '../personal-info-header/personal-info-header.component';
import { SecondaryInfoHeaderComponent } from '../secondary-info-header/secondary-info-header.component';
import { DependantViewComponent } from './dependant-view.component';
import { PreviousAppointmentsComponent } from '../previous-appointments/previous-appointments.component';
import { OrderByPipe } from '../../utils/orderby.pipe';
import { FilterPipe } from '../../utils/filter.pipe';
import { UniquePipe } from '../../utils/unique.pipe';
import { MyDatePickerModule } from 'mydatepicker';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';

describe('DependantViewComponent', () => {
  let component: DependantViewComponent;
  let fixture: ComponentFixture<DependantViewComponent>;
  
  const mockRouter = {};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
          AppointmentComponent, 
          MapViewComponent,
          Marker,
          DirectionsRenderer,
          NguiMapComponent,
          DependantViewComponent,
          ReviewMedicationComponent,
          RepeatPrescriptionComponent,
          SearchPharmacyComponent,
          EllipsisPipe,
          OrderByPipe,
          FilterPipe,
          UniquePipe,
          PreviousAppointmentsComponent,
          PersonalInfoHeaderComponent,
          SecondaryInfoHeaderComponent,
          BsModalRef
        ],
      providers: [
          DataService,
          CookieService,
           BsModalService,
          SwitchBoardService,
          {provide: Router, useValue: mockRouter}
        ],
      imports: [
          MyDatePickerModule,
          HttpClientModule,
          FormsModule
        ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DependantViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
