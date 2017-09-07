import {Component, OnInit, Input} from '@angular/core';
import {trigger, state, style} from '@angular/animations';
import {MenuStateService} from '../services/menu-state.service';
import {Subscription} from 'rxjs/Subscription';
import {DataService} from '../services/data.service';
import {User} from '../class/user';

@Component({
    selector: 'evolve-left-side-menu',
    templateUrl: './left-side-menu.component.html',
    styleUrls: ['./left-side-menu.component.css'],
    providers: [DataService],
    animations: [
        trigger('slideInOut', [
            state('in', style({
                'margin-left': '-100%'
            })),
            state('out', style({
                'margin-left': '0%'
            }))
        ]),
    ]
})
export class LeftSideMenuComponent implements OnInit {

    @Input() menuState: string;
    userInfo: User;
    private menuStateService: MenuStateService;
    private menuStateSubscription: Subscription;

    constructor(pMenuStateService: MenuStateService, private data: DataService) {

        this.menuStateService = pMenuStateService;
        this.data.getUserInfoByUserID(2).subscribe(
            res => this.userInfo = res,
            err => console.log(err)
        );

    }

    ngOnInit() {
        this.menuStateSubscription = this.menuStateService.menuState$.subscribe((pMenuState) => {
            this.menuState = pMenuState;
        });
    }

    ngOnDestroy(): void {
        this.menuStateSubscription.unsubscribe();
    }
}
