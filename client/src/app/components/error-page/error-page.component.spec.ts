import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ErrorPageComponent} from './error-page.component';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core'

describe('ErrorPageComponent', () => {
    let component: ErrorPageComponent;
    let fixture: ComponentFixture<ErrorPageComponent>;

    var mockRouter = {};
    var mockTimer = {};

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ErrorPageComponent],
            providers: [
            ]
            ,schemas: [CUSTOM_ELEMENTS_SCHEMA]
        })
            .compileComponents();
    }));

    it('should be created', async () => {
        fixture = TestBed.createComponent(ErrorPageComponent);
        component = fixture.componentInstance;
        expect(component).toBeTruthy();
    });
});
