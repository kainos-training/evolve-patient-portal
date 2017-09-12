import {NO_ERRORS_SCHEMA} from '@angular/core';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

describe('AppComponent', () => {
    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            schemas: [NO_ERRORS_SCHEMA,
                CUSTOM_ELEMENTS_SCHEMA],
            declarations: [
                AppComponent
            ],
            imports: [
                BrowserAnimationsModule,
                HttpClientModule
            ]
        }).compileComponents();
    }));

    it('should be created', async () => {
        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
        expect(component).toBeTruthy();
    });
});
