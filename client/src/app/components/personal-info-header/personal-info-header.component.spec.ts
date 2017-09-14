import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalInfoHeaderComponent } from './personal-info-header.component';
import { DataService } from '../../services/data.service';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { SwitchBoardService } from '../../services/switch-board.service';
import { Router } from '@angular/router';

describe('PersonalInfoHeaderComponent', () => {
    let component: PersonalInfoHeaderComponent;
    let fixture: ComponentFixture<PersonalInfoHeaderComponent>;

    const mockRouter = {};

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PersonalInfoHeaderComponent],
            providers: [
                DataService,
                CookieService,
                SwitchBoardService,
                { provide: Router, useValue: mockRouter }
            ],
            imports: [
                HttpClientModule
            ]

        })
            .compileComponents();
    }));

    it('should be created', async () => {
        fixture = TestBed.createComponent(PersonalInfoHeaderComponent);
        component = fixture.componentInstance;
        expect(component).toBeTruthy();
    });
});
