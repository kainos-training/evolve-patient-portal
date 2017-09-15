import { SideEffect } from "../../class/SideEffect";
import { BsModalRef, BsModalService, ModalModule } from "ngx-bootstrap";
import { SideEffectsComponent } from "./side-effects.component";
import { ComponentFixture } from "@angular/core/testing";
import { async } from "@angular/core/testing";
import { TestBed } from "@angular/core/testing";
import { EllipsisPipe } from "../../utils/ellipsis.pipe";
import { APP_BASE_HREF } from "@angular/common";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { DataService } from "../../services/data.service";
import { SwitchBoardService } from "../../services/switch-board.service";
import { FormsModule } from "@angular/forms";
import { User } from "../../class/User";



export class MockDataService {
    userSideEffects: Array<SideEffect>;
    constructor() {
        this.userSideEffects = new Array<SideEffect>();
        this.userSideEffects.push(new SideEffect(1, 1, "Headaches", "", false));
    }
    getCookie() {
        return "1";
    }

    getUserSideEffects(userID: number) {
        if (userID == 1) {
            return this.userSideEffects
        }
        return [];
    }
    addUserSideEffect(userID: number, commentText: String) {
        this.userSideEffects.push(new SideEffect(2, userID, commentText, "", false));
    }
}

export class MockSwitchboardService {
    getUser(userID: number) {
        let u: User;
        return u;
    }
}

export class MockBSModalService {
    show() {
        return new BsModalRef();
    }
}

describe('SideEffectsComponent', () => {
    let component: SideEffectsComponent;
    let fixture: ComponentFixture<SideEffectsComponent>;
    let mockDataService: MockDataService;

    beforeEach(async(() => {
        mockDataService = new MockDataService();
        TestBed.configureTestingModule({
            declarations: [
                SideEffectsComponent,
                EllipsisPipe,
                ],
            providers: [
                DataService,
                
                { provide: APP_BASE_HREF, useValue: '/' }],
            imports: [
                ModalModule.forRoot(),
                FormsModule,
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        })
            .compileComponents();
    }));

    TestBed.overrideComponent(SideEffectsComponent, {
        set: {
            providers: [
                { provide: DataService, useClass: MockDataService },
                { provide: SwitchBoardService, useClass: MockSwitchboardService },
                { provide: BsModalService, useClass: MockBSModalService }
            ]
        }
    });

    it('should be created', async () => {
        fixture = TestBed.createComponent(SideEffectsComponent);
        component = fixture.componentInstance;
        expect(component).toBeTruthy();
    });

    it('should get the cookie from the data service', async () => {
        fixture = TestBed.createComponent(SideEffectsComponent);
        component = fixture.componentInstance;
        expect(this.mockDataService.getCookie()).toBe("1");
    });

    it('should change showSideEffects boolean from true to false', async () => {
        fixture = TestBed.createComponent(SideEffectsComponent);
        component = fixture.componentInstance;
        component.showSideEffects = true;
        component.selectShowSideEffects();
        expect(component.showSideEffects).toBe(false);
    });

});
