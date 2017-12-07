import { Subscription } from 'rxjs/Rx';
import { SwitchBoardService } from '../../services/switch-board.service';
import { User } from '../../class/User';
import { DataService } from '../../services/data.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import { TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';

@Component({
    selector: 'evolve-dependant-view',
    templateUrl: './dependant-view.component.html',
    styleUrls: ['./dependant-view.component.css'],
    providers: [{ provide: BsDropdownConfig, useValue: { autoClose: false } }]
})
export class DependantViewComponent implements OnInit, OnDestroy {

    private viewingDependant: User;
    private dependantSubscription: Subscription;
    public modalRef: BsModalRef;
    public newUserDetails: User;
    public address: string;
    public email: string;
    public phoneNumber: string;
    private HTTPService: DataService;

    constructor(private data: DataService, private switchboard: SwitchBoardService, private modalService: BsModalService) {
        this.HTTPService = data;
    }

    ngOnInit() {
        //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        //Add 'implements O nInit' to the class.
        this.newUserDetails = new User();
        this.dependantSubscription = this.switchboard.viewingDependant$.subscribe(
            dependant => {
                this.viewingDependant = dependant;
                this.address = this.viewingDependant.address;
                this.email = this.viewingDependant.email;
                this.phoneNumber = this.viewingDependant.phoneNumber;}
        );

    }

    ngOnDestroy() {
        //Called once, before the instance is destroyed.
        //Add 'implements OnDestroy' to the class.
        this.dependantSubscription.unsubscribe();
    }

    public openModal(template: TemplateRef<any>){
        this.modalRef = this.modalService.show(template);
    }

    public updateUserDetails(){
        const body = {
            address: this.address,
            userID: this.viewingDependant.userID,
            email: this.email,
            phoneNumber: this.phoneNumber
        };

        this.HTTPService.updateUserDetails(body).then((result)=>{
            this.modalRef.hide();
            this.viewingDependant.address = body.address;
            this.viewingDependant.email = body.email;
            this.viewingDependant.phoneNumber = body.phoneNumber;
            console.log(result);
        }).catch((err)=>{
            console.log(err);
            //this.modalRef.hide();
        });
    }
}
