import {BsModalService, ComponentLoaderFactory, PositioningService} from 'ngx-bootstrap';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {TopBarComponent} from './top-bar.component';
import {PersonalInfoHeaderComponent} from '../personal-info-header/personal-info-header.component';
import {MenuStateService} from '../../services/menu-state.service';
import {DataService} from '../../services/data.service';
import {Router} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {SwitchBoardService} from '../../services/switch-board.service';

describe('TopBarComponent', () => {
    let component: TopBarComponent;
    let fixture: ComponentFixture<TopBarComponent>;
    const mockDataService = {};
    const mockRouter = {};
    const mockSwitchBoard = {};
    const mockObservable = {};

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TopBarComponent, PersonalInfoHeaderComponent],
            imports: [FormsModule],
            providers: [
                MenuStateService,
                BsModalService,
                ComponentLoaderFactory,
                PositioningService,
                SwitchBoardService,
                {provide: DataService, useValue: mockDataService},
                {provide: Router, useValue: mockRouter}
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TopBarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });

    it('sideMenu state should be out/in depending on the window size', () => {
        var menuState = component.getMenuState();
        expect(menuState).toEqual('out');
    });
});
