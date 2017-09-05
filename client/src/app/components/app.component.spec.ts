import { TestBed, async, inject } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { AlertModule } from "ngx-bootstrap";

import { HttpClient } from "@angular/common/http";
import { HttpClientModule } from "@angular/common/http";

import {DataService} from "../services/data.service";

import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('AppComponent', () => {
  beforeEach(async(() => {
    
    TestBed.configureTestingModule({
        schemas: [ NO_ERRORS_SCHEMA ],
        declarations: [
            AppComponent
          ],
          imports: [
            AlertModule.forRoot(),
            HttpClientModule,
          ],
          providers: [
              {provide: DataService }
          ]
    }).compileComponents();
  }));

  it('should create the app', inject([DataService], async(() => {
    let service = TestBed.get(DataService);
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  })));

  it(`should have as title 'Evolve Patient Portal'`, inject([DataService], async(() => {
    let service = TestBed.get(DataService);
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Evolve Patient Portal');
  })));
});
