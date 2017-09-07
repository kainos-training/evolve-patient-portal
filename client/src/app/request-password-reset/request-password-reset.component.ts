import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { DataService } from '../services/data.service'
import { Location } from '@angular/common';
import { User } from '../user';
import { Subscription } from 'rxjs/Subscription';
import { SwitchBoardService } from '../services/switch-board.service';
import { Router } from '@angular/router';

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


    constructor(dataService: DataService, private switchBoard: SwitchBoardService, private router: Router) {
        this.user = new User();
        this.valid = true;
        this.successful = false;
        this.dataService = dataService;
        this.evolveLogoPath = 'assets/EvolveLogo.svg';
    }

    onRequestReset(): void {
        console.log('reaches onRequestReset() and Username is: ' + this.user.username);
        //this.dataService.requestReset(this.username); 
        this.dataService.requestResetPassword(this.user, this.router);
        //alert("dataService.requestReset returned " + this.successful);
    }

    onGoBack(): void {
        //alert('User clicked cancel');
        //this.location.back();
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
