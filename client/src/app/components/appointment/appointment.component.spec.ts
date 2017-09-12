import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {HttpClientModule} from '@angular/common/http';
import {AppointmentComponent} from './appointment.component';
import {MenuStateService} from '../../services/menu-state.service';
import {DataService} from '../../services/data.service';
import { MapViewComponent } from "../map-view/map-view.component";
import { Marker, DirectionsRenderer, NguiMapComponent } from "@ngui/map/dist";

describe('AppointmentComponent', () => {
    let component: AppointmentComponent;
    let fixture: ComponentFixture<AppointmentComponent>;

    const mockDataService = {};
    const mockMapView = {};

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AppointmentComponent, 
                MapViewComponent,
                Marker,
                DirectionsRenderer,
                NguiMapComponent
            ],
            providers: [
                MenuStateService,
                {provide: DataService, useValue: mockDataService}
            ],
            imports: [
                BrowserAnimationsModule,
                HttpClientModule
            ]
        })
            .compileComponents();
    }));

    it('should be created', async () => {
        fixture = TestBed.createComponent(AppointmentComponent);
        component = fixture.componentInstance;
        expect(component).toBeTruthy();
    });
});