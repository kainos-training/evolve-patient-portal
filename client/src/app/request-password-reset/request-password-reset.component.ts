import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { DataService } from '../services/data.service'
import { Subscription } from 'rxjs/Subscription';
import { SwitchBoardService } from '../services/switch-board.service';
import { Router } from '@angular/router';
import {User} from '../class/user';

@Component({
    selector: 'evolve-request-password-reset',
    templateUrl: './request-password-reset.component.html',
    styleUrls: ['./request-password-reset.component.css']
})
export class RequestPasswordResetComponent implements OnInit, OnDestroy {

    public evolveLogoPath: string;
    valid: Boolean;
    successful: Boolean;
    dataService: DataService;
    user: User;
    validSubscription: Subscription;
    successfulSubscription: Subscription;
    tickPath: string;


    constructor(dataService: DataService, private switchBoard: SwitchBoardService, private router: Router) {
        this.user = new User();
        this.valid = true;
        this.successful = false;
        this.dataService = dataService;
        this.evolveLogoPath = 'assets/EvolveLogo.svg';
        this.tickPath = 'assets/tickInCircle.svg';
    }

    onRequestReset(): void {
        this.dataService.requestResetPassword(this.user, this.router);
    }

    onGoBack(): void {
    }

    ngOnInit(): void {
        this.validSubscription = this.switchBoard.valid$.subscribe((v) => {
            this.valid = v;
        });

        this.successfulSubscription = this.switchBoard.successful$.subscribe((s) => {
            this.successful = s;
        });

    }

    ngOnDestroy(): void {
        this.validSubscription.unsubscribe();
        this.successfulSubscription.unsubscribe();
    }

}
