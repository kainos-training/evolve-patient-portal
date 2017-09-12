import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ErrorPageComponent} from './error-page.component';
import {Router} from '@angular/router';
import {SimpleTimer} from 'ng2-simple-timer';

describe('ErrorPageComponent', () => {
    let component: ErrorPageComponent;
    let fixture: ComponentFixture<ErrorPageComponent>;

    var mockRouter = {};
    var mockTimer = {};

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ErrorPageComponent],
            providers: [
                {provide: Router, useValue: mockRouter},
                {provide: SimpleTimer, useValue: mockTimer}
            ]
        })
            .compileComponents();
    }));

    it('should be created', async () => {
        fixture = TestBed.createComponent(ErrorPageComponent);
        component = fixture.componentInstance;
        expect(component).toBeTruthy();
    });
});
