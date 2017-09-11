import { Component, Input } from '@angular/core';
import { trigger, state, style } from '@angular/animations';
import { MenuStateService } from '../../services/menu-state.service';
import { Subscription } from 'rxjs/Subscription';
import { DataService } from '../../services/data.service';
import { User } from '../../class/User';
import { SwitchBoardService } from '../../services/switch-board.service';

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
export class LeftSideMenuComponent {

    @Input() menuState: string;
    private user: User = new User();
    private userSubscription: Subscription;

    constructor(private data: DataService, private switchboard: SwitchBoardService) {
        this.userSubscription = switchboard.user$.subscribe(user => this.user = user);
    }

    ngOnDestroy(): void {
            this.userSubscription.unsubscribe();
    }
}
