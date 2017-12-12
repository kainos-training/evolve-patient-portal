import { NavigationOption, NavigationOptionEnum } from '../../app.globals';
import { Component, Input, HostListener, OnInit } from '@angular/core';
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
    private navigationOptions: typeof NavigationOptionEnum = NavigationOptionEnum;
    private menuStateSubscription: Subscription;

    private viewingDependant: User;
    private dependants: User[];
    private readonly MDSCREENSIZE: number = 768;

    constructor(private data: DataService, private switchboard: SwitchBoardService, private menuStateService: MenuStateService) {
        this.menuStateSubscription = this.menuStateService.menuState$.subscribe(menuState => this.menuState = menuState);
        this.determineMenuState();
    }

    ngOnDestroy(): void {
        if (this.userSubscription) {
            this.userSubscription.unsubscribe();
        }
        if (this.menuStateSubscription) {
            this.menuStateSubscription.unsubscribe();
        }
    }

    navigationItemClicked($event) {
        // update the css for the 'active' option
        $($event.target).addClass('active').siblings().removeClass('active');
        
        // update switchboard
        const targetHTML: NavigationOption = $event.target.innerHTML;
        this.switchboard.updateNavigationOption(targetHTML);

        // check if the option clicked was dependants to show the drop down of dependants
        if(targetHTML == NavigationOptionEnum.MyDependants.toString()) {
            // toggle the accordion 
            $('#dependantsAccordion').slideToggle();
        } else {
            // close the accordion
            $('#dependantsAccordion').slideUp();
        }
       
    }

    onDependantClicked($event, dependant) {
        // prevent the page jumping
        $event.preventDefault();

        // update the css
        $($event.target).addClass('active').siblings().removeClass('active');

        // set the dependant
        this.switchboard.updateViewingDependant(dependant);
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
                this.user.mobilePhoneNumber = res[0].mobilePhoneNumber;
                this.user.homePhoneNumber = res[0].homePhoneNumber;
                this.user.workPhoneNumber = res[0].workPhoneNumber;
                this.user.title = res[0].title;
                this.user.gpID = res[0].gpID;
                this.user.gpFullName = res[0].gpFullName;
                this.user.gpPracticeName = res[0].gpPracticeName;
            }
        );
        
                if(this.user) {
                    if (this.user.userID) {
                        this.data.getAllUserDependants(this.user.userID).subscribe(
                            res => this.dependants = res
                        );
                        
                    }
                }
            
    }

    private determineMenuState() {
        this.menuState = window.innerWidth >= this.MDSCREENSIZE ? 'out' : 'in';
    }

    toggleMenuState() {
        this.menuState = this.menuState === 'out' ? 'in' : 'out';
        this.menuStateService.stateString(this.menuState);
    }

    getMenuState(): string {
        return this.menuState;
    }

    @HostListener('window:resize', ['$event'])
    resize(event) {
        this.determineMenuState();
        this.menuStateService.stateString(this.menuState);
    }
}