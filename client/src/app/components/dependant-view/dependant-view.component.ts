import { Subscription } from 'rxjs/Rx';
import { SwitchBoardService } from '../../services/switch-board.service';
import { User } from '../../class/User';
import { GP } from '../../class/GP';
import { GPPractice } from '../../class/GPPractice';
import { DataService } from '../../services/data.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import { TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { element } from 'protractor';
import { document } from 'ngx-bootstrap/utils/facade/browser';


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
    public gp: GP[];
    //public gpInstance: GP;
    public gpPractice: GPPractice[];
    public gpID: number;
    public gpName: string;
    public gpPracticNames: string [];
    public gpPracName: string;
    private HTTPService: DataService;
    public toStr= JSON.stringify;
    

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
                this.gp = [];
                this.gpID = this.viewingDependant.gpID;

                //this.gpName = this.viewingDependant.gpFullName;
                console.log("gpName"+this.gpName);
                
                this.gpPracName = this.viewingDependant.gpPracticeName;
                this.gpPractice = [];
                //this.gpInstance.gpFullName = this.viewingDependant.gpFullName;
                //console.log("gpIntance"+this.gpInstance.gpFullName);
                //this.gpInstance.gpID = this.gpID;
                //this.gpInstance.gpPracticeID = null;
                //this.gp.push(this.gpInstance);
                console.log("GP - "+this.gp);
                console.log();
                this.getAllGPPractice();

                
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
;   // }



 public getAllGPPractice(){
     if(this.gpPractice.length=0){
         this.gp = [];
         this.gp[0].gpID = this.gpID;
         this.gp[0].gpFullName = this.gpName;
     }
     for(var i=0;i<this.gpPractice.length;i++){
         var elem = document.querySelector('#'+this.gpPractice[i].gpPracticeName)
         elem.parentNode.removeChild(elem);

     }
     this.gpPractice = []
      this.HTTPService.getAllGPPractice().subscribe(
          res => this.gpPractice = res
          
      )
      console.log(this.gpPractice)
}


public getAllGP(practiceName){
  for(i=0;i<this.gp.length;i++){
      var elem = document.querySelector('#'+this.gp[i].gpFullName.charAt(4))
      elem.parentNode.removeChild(elem);
  }
  this.gp =[];
    console.log(this.gp.length);
    for(var i = 0; i<this.gpPractice.length;i++){
        console.log("for loop called");
        if(this.gpPractice[i].gpPracticeName ==practiceName){
            console.log(this.gpPractice[i].gpPracticeID);
            this.getAllGPbyPracticeID(this.gpPractice[i].gpPracticeID);
        }
    }
    
}
    
public getAllGPbyPracticeID(x){
    this.HTTPService.getAllGPbyPracticeID(x).subscribe(
        res => this.gp = res
    )


}

public gpPracticeChangeDropdown(x){
    this.gpPracName = x;
    console.log(this.gpPracName)
    //this.getAllGP(this.gpPracName);
}

public gpChangeDropdown(x){
    this.gpName = x;
    console.log(this.gpName)
}

    public updateUserDetails(){
        for(var i = 0; i < this.gp.length; i++) {
            if(this.gp[i].gpFullName == this.gpName) {
                this.gpID = this.gp[i].gpID;
            }
        }

        const body = {
            preferredName: this.preferredName,
            address: this.address,
            userID: this.viewingDependant.userID,
            email: this.email,
            mobilePhoneNumber: this.mobilePhoneNumber,
            homePhoneNumber: this.homePhoneNumber,
            workPhoneNumber: this.workPhoneNumber,
            gpID: this.gpID
        };

        this.HTTPService.updateUserDetails(body).then((result)=>{
            this.modalRef.hide();
            this.viewingDependant.preferredName = body.preferredName;
            this.viewingDependant.address = body.address;
            this.viewingDependant.email = body.email;
            this.viewingDependant.mobilePhoneNumber = body.mobilePhoneNumber;
            this.viewingDependant.homePhoneNumber = body.homePhoneNumber;
            this.viewingDependant.workPhoneNumber = body.workPhoneNumber;
            this.viewingDependant.gpID = body.gpID;
        }).catch((err)=>{
            console.log(err);
        });
    }
}

