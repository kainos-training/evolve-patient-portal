import { TestBed, async, inject } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { AlertModule } from "ngx-bootstrap";

import { HttpClient } from "@angular/common/http";
import { HttpClientModule } from "@angular/common/http";

import { DataService } from "../services/data.service";

import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('AppComponent', () => {
    let mockDataService: MockDataService; //create mock data service object
    beforeEach(async(() => {

        mockDataService = new MockDataService();

        TestBed.configureTestingModule({
            schemas: [NO_ERRORS_SCHEMA],
            declarations: [
                AppComponent
            ],
            imports: [
                AlertModule.forRoot(),
                HttpClientModule,
            ],
            providers: [
                { provide: DataService, useValue: mockDataService } //use mock data service object
            ]
        }).compileComponents();
    }));

    it('should create the app', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));

    it(`should have as title 'Evolve Patient Portal'`, async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app.title).toEqual('Evolve Patient Portal');
    }));
});

class MockDataService {

    //no methods needed in this component yet
    //add data service stub methods here

};
