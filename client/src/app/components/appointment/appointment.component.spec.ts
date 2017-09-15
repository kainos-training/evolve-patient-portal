import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {AppointmentComponent} from './appointment.component';
import {DataService} from '../../services/data.service';
import {log} from 'util';
import {ModalModule} from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';

describe('AppointmentComponent', () => {
    let component: AppointmentComponent;
    let fixture: ComponentFixture<AppointmentComponent>;

    const mockDataService = {};
    const mockMapView = {};

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AppointmentComponent
            ],
            providers: [
                {provide: DataService, useValue: mockDataService}
            ],
            imports: [
                ModalModule.forRoot(),
                FormsModule
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        })
            .compileComponents();
    }));

    it('should be created', async () => {
        fixture = TestBed.createComponent(AppointmentComponent);
        component = fixture.componentInstance;
        expect(component).toBeTruthy();
    });

    it('should toggle from false to true', async () => {
        fixture = TestBed.createComponent(AppointmentComponent);
        component = fixture.componentInstance;
        this.focusedAppointment["FalseInput"] = false;
        this.toggle("FalseInput");
        expect(this.focusedAppointment["FalseInput"]).toBeTruthy();
    });

    it('should toggle from true to false', async () => {
        fixture = TestBed.createComponent(AppointmentComponent);
        component = fixture.componentInstance;
        this.focusedAppointment["TrueInput"] = true;
        this.toggle("TrueInput");
        expect(this.focusedAppointment["TrueInput"]).toBeFalsy();
    });
});