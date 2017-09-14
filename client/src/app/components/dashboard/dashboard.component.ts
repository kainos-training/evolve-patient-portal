import { Subscription } from 'rxjs/Rx';
import { SwitchBoardService } from '../../services/switch-board.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationOption, NavigationOptionEnum } from '../../app.globals';
import { User } from '../../class/User';
import { DataService } from '../../services/data.service';

@Component({
    selector: 'evolve-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

    private navigationOptions: typeof NavigationOptionEnum = NavigationOptionEnum;
    private navigationOption: NavigationOption = NavigationOptionEnum.MyDashboard.toString();
    private navigationOptionSubscription: Subscription;

    constructor(private switchboard: SwitchBoardService, private data : DataService) {
        
    }

    ngOnInit() {
        //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        //Add 'implements OnInit' to the class.
        this.navigationOptionSubscription = this.switchboard.navigationOption$.subscribe(
            navigationOption => this.navigationOption = navigationOption
        );
    }

    ngOnDestroy() {
        //Called once, before the instance is destroyed.
        //Add 'implements OnDestroy' to the class.
        this.navigationOptionSubscription.unsubscribe();
    }

    getNavigationOption(): NavigationOption {
        return this.navigationOption;
    }
}