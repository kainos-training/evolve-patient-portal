import { Component, OnInit } from '@angular/core';
import { Condition } from '../../class/Condition';
import { User } from '../../class/User';
import { SwitchBoardService } from '../../services/switch-board.service';
import { Subscription } from 'rxjs/Rx';
import { DataService } from '../../services/data.service';

@Component({
    selector: 'evolve-condition',
    templateUrl: './condition.component.html',
    styleUrls: ['./condition.component.css']
})
export class ConditionComponent implements OnInit {
    public currentConditions: Condition[];
    public previousConditions: Condition[];
    public current: boolean;
    private user: User = new User();
    private userSubscription: Subscription;

    constructor(private dataService: DataService, private switchboard: SwitchBoardService) {
        this.switchboard.user$.subscribe(usr => this.user = usr);
        this.dataService.getUserFromCookie(this.user);
        this.current = true;
    }

    onNavigate = function(condition: Condition){
        window.open(condition.conditionLink);
    }

    ngOnInit() {
        if (this.user) {
            if (this.user.userID) {
                this.dataService.getCurrentConditions(this.user.userID).subscribe(
                    res => this.currentConditions = res
                )
                this.dataService.getPreviousConditions(this.user.userID).subscribe(
                    res => this.previousConditions = res
                )
                document.getElementById('currentButton').focus();
            }
        }
    }
}
