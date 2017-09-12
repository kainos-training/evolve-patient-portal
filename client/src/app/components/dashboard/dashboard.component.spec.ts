import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {DashboardComponent} from './dashboard.component';
import {TopBarComponent} from '../top-bar/top-bar.component';
import {LeftSideMenuComponent} from '../left-side-menu/left-side-menu.component';
import {MapViewComponent} from '../map-view/map-view.component';
import {AppointmentComponent} from '../appointment/appointment.component';
import {Marker, NguiMapComponent, DirectionsRenderer} from '@ngui/map/dist';
import {ReviewMedicationComponent} from '../review-medication/review-medication.component';
import {EllipsisPipe} from '../../utils/ellipsis.pipe';
import {ModalModule} from 'ngx-bootstrap/modal';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';

describe('DashboardComponent', () => {
    let component: DashboardComponent;
    let fixture: ComponentFixture<DashboardComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                DashboardComponent,
                EllipsisPipe,
                TopBarComponent,
                LeftSideMenuComponent,
                MapViewComponent,
                AppointmentComponent,
                ReviewMedicationComponent,
                Marker,
                DirectionsRenderer,
                NguiMapComponent
            ],
            providers: [],
            imports: [
                BrowserModule,
                ModalModule.forRoot(),
                FormsModule
            ]
        })
            .compileComponents();
    }));

    it('should be created', async () => {
        fixture = TestBed.createComponent(DashboardComponent);
        component = fixture.componentInstance;
        expect(component).toBeTruthy();
    });
});

