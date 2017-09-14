import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelineComponent } from './timeline.component';
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MenuStateService } from "../../services/menu-state.service";
import { DataService } from "../../services/data.service";
import { CookieService } from "ngx-cookie-service";
import { SwitchBoardService } from "../../services/switch-board.service";
import { Router } from '@angular/router';
import { TimelineStructure } from "../../class/TimelineStructure";

export class MockDataService {
    getMedicationList(userID: number) {
        let toReturn: Array<TimelineStructure> = [];
        if (userID == 1) {
            toReturn.push(new TimelineStructure());
            toReturn.push(new TimelineStructure());
        }
        return toReturn;
    }
}

describe('TimelineComponent', () => {
    let component: TimelineComponent;
    let fixture: ComponentFixture<TimelineComponent>;

    const mockDataService = {};
    var mockRouter = {};

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TimelineComponent
            ],
            providers: [
                MenuStateService,
                { provide: DataService, useValue: mockDataService },
                CookieService,
                SwitchBoardService,
                { provide: Router, useValue: mockRouter }
            ],
            imports: [
                HttpClientModule, BrowserAnimationsModule
            ]
        })
            .compileComponents();

        TestBed.overrideComponent(TimelineComponent, {
            set: {
                providers: [
                    { provide: DataService, useClass: MockDataService }
                ]
            }
        });
    }));

    it('should be created', async () => {
        fixture = TestBed.createComponent(TimelineComponent);
        component = fixture.componentInstance;
        expect(component).toBeTruthy();
    });

    it('should have a defined data service', async () => {
        fixture = TestBed.createComponent(TimelineComponent);
        component = fixture.componentInstance;
        expect(mockDataService).toBeDefined();
    });
    

});
