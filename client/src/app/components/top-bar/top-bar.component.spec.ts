import {TopBarComponent} from './top-bar.component';
import {FormsModule} from '@angular/forms';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {PersonalInfoHeaderComponent} from '../personal-info-header/personal-info-header.component';
import {DataService} from '../../services/data.service';
import {HttpClientModule} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {SwitchBoardService} from '../../services/switch-board.service';
import {Router} from '@angular/router';
import {MenuStateService} from "../../services/menu-state.service";
import {BsModalRef, ComponentLoaderFactory, PositioningService} from "ngx-bootstrap";
import {BsModalService} from 'ngx-bootstrap/modal';

fdescribe('TopBarComponent', () => {
    let component: TopBarComponent;
    let fixture: ComponentFixture<TopBarComponent>;

    const mockRouter = {};

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, HttpClientModule],
            declarations: [TopBarComponent,
                PersonalInfoHeaderComponent],
            providers: [DataService,
                CookieService,
                SwitchBoardService,
                {provide: Router, useValue: mockRouter},
                MenuStateService,
                BsModalRef,
                BsModalService,
                ComponentLoaderFactory,
                PositioningService]
        }).compileComponents();
    }));

    it('should be created', async () => {
        fixture = TestBed.createComponent(TopBarComponent);
        component = fixture.componentInstance;
        expect(component).toBeTruthy();
    });

    it('sideMenu state should be out/in depending on the window size', () => {
               var menuState = component.getMenuState();
               expect(menuState).toEqual('out');
        });
});