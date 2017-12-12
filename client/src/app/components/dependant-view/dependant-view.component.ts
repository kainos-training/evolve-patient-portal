import { Subscription } from 'rxjs/Rx';
import { SwitchBoardService } from '../../services/switch-board.service';
import { User } from '../../class/User';
import { GP } from '../../class/GP';
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
    public preferredName: string;
    public address: string;
    public email: string;
    public mobilePhoneNumber: string;
    public homePhoneNumber: string;
    public workPhoneNumber: string;
    public gpID: number;
    public gpFullName: string;
    public gpPracticeName: string;
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
                this.preferredName = this.viewingDependant.preferredName;
                this.address = this.viewingDependant.address;
                this.email = this.viewingDependant.email;
                this.mobilePhoneNumber = this.viewingDependant.mobilePhoneNumber;
                this.homePhoneNumber = this.viewingDependant.homePhoneNumber;
                this.workPhoneNumber = this.viewingDependant.workPhoneNumber;
                this.gpID = this.viewingDependant.gpID;
                this.gpFullName = this.viewingDependant.gpFullName;
                this.gpPracticeName = this.viewingDependant.gpPracticeName;
            }
                
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

    //public getUserInfoByUserID(){
      //  this.data.getUserInfoByUserID(this.viewingDependant.userID).subscribe(
        //    res =>{
          //      this.viewingDependant.g
            //}
        //)
   // }

    

    public updateUserDetails(){
        const body = {
            preferredName: this.preferredName,
            address: this.address,
            userID: this.viewingDependant.userID,
            email: this.email,
            mobilePhoneNumber: this.mobilePhoneNumber,
            homePhoneNumber: this.homePhoneNumber,
            workPhoneNumber: this.workPhoneNumber
        };

        this.HTTPService.updateUserDetails(body).then((result)=>{
            this.modalRef.hide();
            this.viewingDependant.preferredName = body.preferredName;
            this.viewingDependant.address = body.address;
            this.viewingDependant.email = body.email;
            this.viewingDependant.mobilePhoneNumber = body.mobilePhoneNumber;
            this.viewingDependant.homePhoneNumber = body.homePhoneNumber;
            this.viewingDependant.workPhoneNumber = body.workPhoneNumber;
            console.log(result);
        }).catch((err)=>{
            console.log(err);
        });
    }
}
