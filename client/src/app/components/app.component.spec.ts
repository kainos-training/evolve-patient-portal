import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {HttpClientModule} from '@angular/common/http';
import { Marker, DirectionsRenderer, NguiMapComponent } from "@ngui/map/dist";
import { MapViewComponent } from "../map-view/map-view.component";
import { MenuStateService } from "../services/menu-state.service";
import { DataService } from "../services/data.service";
import { AppComponent } from "./app.component";
import { AppointmentComponent } from "./appointment/appointment.component";

describe('AppComponent', () => {
    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;

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
        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
        expect(component).toBeTruthy();
    });
});
