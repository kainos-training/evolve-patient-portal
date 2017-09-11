import {Component, Input, OnInit} from '@angular/core';
import {trigger, state, style} from '@angular/animations';
import {MenuStateService} from '../../services/menu-state.service';
import {Subscription} from 'rxjs/Subscription';
import {DataService} from '../../services/data.service';
import {User} from '../../class/User';
import {SwitchBoardService} from '../../services/switch-board.service';

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
    private user: User = new User();
    private userSubscription: Subscription;
    private menuStateSubscription: Subscription;

    constructor(private data: DataService, private switchboard: SwitchBoardService, private menuStateService: MenuStateService) {
        this.userSubscription = this.switchboard.user$.subscribe(user => this.user = user);
        this.menuStateSubscription = this.menuStateService.menuState$.subscribe(menuState => this.menuState = menuState);
    }

    ngOnDestroy(): void {
        if (this.userSubscription) {
            this.userSubscription.unsubscribe();
        }
        if (this.menuStateSubscription) {
            this.menuStateSubscription.unsubscribe();
        }
    }

    ngOnInit(): void {
        this.data.getUserFromCookie(this.user);
        this.data.getUserInfoByUserID(this.user.userID).subscribe(
            res => {
                this.user.MRIN = res[0].MRIN;
                this.user.address = res[0].address;
                this.user.dateOfBirth = res[0].dateOfBirth;
                this.user.email = res[0].email;
                this.user.firstName = res[0].firstName;
                this.user.gender = res[0].gender;
                this.user.lastName = res[0].lastName;
                this.user.phoneNumber = res[0].phoneNumber;
                this.user.title = res[0].title;
            },
            err => console.log(err)
        );
    }

}