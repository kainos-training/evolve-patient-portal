import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {LeftSideMenuComponent} from './left-side-menu.component';
import {DataService} from '../../services/data.service';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

describe('LeftSideMenuComponent', () => {
    let component: LeftSideMenuComponent;
    let fixture: ComponentFixture<LeftSideMenuComponent>;

    const mockDataService = {};

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [LeftSideMenuComponent],
            providers: [
                {provide: DataService, useValue: mockDataService},
            ],
            imports: [
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        }).compileComponents();
    }));

    it('should be created', async () => {
        fixture = TestBed.createComponent(LeftSideMenuComponent);
        component = fixture.componentInstance;
        expect(component).toBeTruthy();
    });
});