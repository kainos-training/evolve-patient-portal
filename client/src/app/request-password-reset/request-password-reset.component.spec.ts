import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { User } from '../user';
import { RequestPasswordResetComponent } from './request-password-reset.component';
import { LoginComponent } from '../login/login.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DataService } from '../services/data.service';
import { SwitchBoardService } from '../services/switch-board.service';
import { APP_BASE_HREF } from '@angular/common';

describe('RequestPasswordResetComponent', () => {

    const mockDataService = {};
    const mockSwitchboardService = {};

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                RequestPasswordResetComponent,
                LoginComponent
            ],
            imports: [
                FormsModule,
                RouterModule.forRoot([{
                    path: 'login',
                    component: LoginComponent
                }
                ])
            ],
            providers: [
                { provide: DataService, useValue: mockDataService },
                {provide: SwitchBoardService, useValue: mockSwitchboardService},
                { provide: APP_BASE_HREF, useValue: '/' }
            ]
        })
            .compileComponents();
    }));

    it('should be created', () => {
        let fixture = TestBed.createComponent(RequestPasswordResetComponent);
        let component = fixture.componentInstance;
        expect(component).toBeTruthy();
    });
});
