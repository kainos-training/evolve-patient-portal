import {TestBed, async} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {AlertModule} from 'ngx-bootstrap';
import {HttpClientModule} from '@angular/common/http';
import {NO_ERRORS_SCHEMA} from '@angular/core';

describe('AppComponent', () => {
    beforeEach(async(() => {

        TestBed.configureTestingModule({
            schemas: [NO_ERRORS_SCHEMA],
            declarations: [
                AppComponent
            ],
            imports: [
                AlertModule.forRoot(),
                HttpClientModule,
            ],
            providers: []
        }).compileComponents();
    }));

    it('should create the app', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));

});
