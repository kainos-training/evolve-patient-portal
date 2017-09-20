import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {HttpClientModule} from '@angular/common/http';
import {PreviousAppointmentsComponent} from './previous-appointments.component';
import {DataService} from '../../services/data.service';
import {log} from 'util';
import {OrderByPipe} from '../../utils/orderby.pipe';
import {EllipsisPipe} from '../../utils/ellipsis.pipe';
import {UniquePipe} from '../../utils/unique.pipe';
import {FilterPipe} from '../../utils/filter.pipe';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {MyDatePickerModule} from 'mydatepicker';

describe('PreviousAppointmentsComponent', () => {
    let component: PreviousAppointmentsComponent;
    let fixture: ComponentFixture<PreviousAppointmentsComponent>;

    const mockDataService = {};
    const mockMapView = {};

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PreviousAppointmentsComponent,
                EllipsisPipe,
                OrderByPipe,
                UniquePipe,
                FilterPipe
            ],
            providers: [
                EllipsisPipe,
                OrderByPipe,
                UniquePipe,
                FilterPipe,
                {provide: DataService, useValue: mockDataService}
            ],
            imports: [
                MyDatePickerModule,
                BrowserAnimationsModule,
                HttpClientModule
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        })
            .compileComponents();
    }));

    it('should be created', async () => {
        fixture = TestBed.createComponent(PreviousAppointmentsComponent);
        component = fixture.componentInstance;
        expect(component).toBeTruthy();
    });
});
