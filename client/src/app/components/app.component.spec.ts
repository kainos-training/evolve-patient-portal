import { NO_ERRORS_SCHEMA } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppComponent } from './app.component';
import { DataService } from '../services/data.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { AlertModule } from 'ngx-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Marker, DirectionsRenderer, NguiMapComponent } from "@ngui/map/dist";
import { MapViewComponent } from "../map-view/map-view.component";
import { MenuStateService } from "../services/menu-state.service";
import { AppointmentComponent } from "./appointment/appointment.component";

describe('AppComponent', () => {
    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;
    const mockDataService = {};
    const mockMapView = {};

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            schemas: [NO_ERRORS_SCHEMA,
                CUSTOM_ELEMENTS_SCHEMA],
            declarations: [
                AppComponent,
                AppointmentComponent,
                MapViewComponent,
                Marker,
                DirectionsRenderer,
                NguiMapComponent
            ],
            providers: [
                MenuStateService,
                { provide: DataService, useValue: mockDataService },
                DataService,
                HttpClient,
                HttpHandler],
            imports: [
                BrowserAnimationsModule,
                HttpClientModule
            ]
        }).compileComponents();
    }));

    it('should create the app', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));

    it('should be created', async () => {
        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
        expect(component).toBeTruthy();
    });
});
