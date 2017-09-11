import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MenuStateService} from '../../services/menu-state.service';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {LeftSideMenuComponent} from './left-side-menu.component';
import {DataService} from '../../services/data.service';
import {HttpClientModule} from '@angular/common/http';

describe('LeftSideMenuComponent', () => {
    let component: LeftSideMenuComponent;
    let fixture: ComponentFixture<LeftSideMenuComponent>;

    const mockDataService = {};

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [LeftSideMenuComponent],
            providers: [
                MenuStateService,
                {provide: DataService, useValue: mockDataService},
            ],
            imports: [
                BrowserAnimationsModule,
                HttpClientModule
            ]
        }).compileComponents();
    }));

    it('should be created', async () => {
        fixture = TestBed.createComponent(LeftSideMenuComponent);
        component = fixture.componentInstance;
        expect(component).toBeTruthy();
    });
});