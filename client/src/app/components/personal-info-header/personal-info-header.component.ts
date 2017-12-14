import { Component, OnInit, Input, SimpleChange, OnChanges } from '@angular/core';
import { DataService } from '../../services/data.service';
import { User } from '../../class/User';
import { Subscription } from 'rxjs';
import { SwitchBoardService } from '../../services/switch-board.service';
import { SimpleChanges } from '@angular/core/src/metadata/lifecycle_hooks';
import { TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { GP } from '../../class/GP';
import { GPPractice } from '../../class/GPPractice';
import { element } from 'protractor';
import { document } from 'ngx-bootstrap/utils/facade/browser';

@Component({
  selector: 'evolve-personal-info-header',
  templateUrl: './personal-info-header.component.html',
  styleUrls: ['./personal-info-header.component.css']
})

export class PersonalInfoHeaderComponent implements OnInit, OnChanges {
    userArray : User = new User();
    userSubscription: Subscription;
    private user: User = new User();
    public modalRef: BsModalRef;
    public gpPractice: GPPractice[];
    public gp: GP[];
    private HTTPService: DataService;
    public currentGP: boolean;
    
    @Input() dependantID; 
    constructor(private data : DataService, private switchboard: SwitchBoardService, private modalService: BsModalService) { 
        this.userSubscription = this.switchboard.user$.subscribe(user => {
            this.user = user;
            this.HTTPService = data;
            this.gpPractice = [];
            this.gp = [];
            this.currentGP=true; 
        });
    }

    ngOnInit() {
        this.displayUserInformation();
    }

    displayUserInformation() {
        this.data.getUserFromCookie(this.user);
        if(this.user) {
            // uses dependantID if available, else defaults to logged in use ID
            const id = this.dependantID || this.user.userID;

            // get the data from the component
            this.data.getUserInfoByUserID(id).subscribe(
                res => {
                    this.userArray.userID = res[0].userID;
                    this.userArray.preferredName = res[0].preferredName;
                    this.userArray.MRIN = res[0].MRIN;
                    this.userArray.address = res[0].address;
                    console.log(this.userArray.address);
                    this.userArray.dateOfBirth = res[0].dateOfBirth;
                    this.userArray.email = res[0].email;
                    this.userArray.firstName = res[0].firstName;
                    this.userArray.gender = res[0].gender;
                    this.userArray.lastName = res[0].lastName;
                    this.userArray.mobilePhoneNumber = res[0].mobilePhoneNumber;
                    this.userArray.homePhoneNumber = res[0].homePhoneNumber;
                    this.userArray.workPhoneNumber = res[0].workPhoneNumber;
                    this.userArray.title = res[0].title;
                    this.userArray.gpID = res[0].gpID;
                    this.userArray.gpFullName = res[0].gpFullName;
                    console.log(this.userArray.gpFullName);
                    this.userArray.gpPracticeName = res[0].gpPracticeName;
                    console.log(this.userArray.gpPracticeName);
                    this.userArray.gpPracticeAddress = res[0].gpPracticeAddress;
                   this.getAllGP(this.userArray.gpPracticeName);
                },
            );
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        // get the new data
        this.displayUserInformation();
    }

    public openModal(template: TemplateRef<any>) {
        this.modalRef = this.modalService.show(template);
        this.getAllGPPractice();
    }

    public getAllGPPractice(){
        console.log("100: "+this.gpPractice.length);
        for(var i=0;i<this.gpPractice.length;i++){
            var elem = document.querySelector('#'+this.gpPractice[i].gpPracticeName)
            elem.parentNode.removeChild(elem);
        }
        
         this.HTTPService.getAllGPPractice().subscribe(
             res => this.gpPractice = res  
         )  
   }
   
   public getAllGP(practiceName){
     for(i=3;i<this.gp.length;i++){
         var elem = document.querySelector('#'+this.gp[i].gpFullName.charAt(4))
         elem.parentNode.removeChild(elem);
     }
     
     this.gp =[];
     console.log("test:"+this.gpPractice.length);
       for(var i = 0; i<this.gpPractice.length;i++){
           console.log("for loop called");
           console.log(this.gpPractice[i].gpPracticeName);
           console.log(practiceName);
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
       console.log(this.gp);
   }
   
   public gpPracticeChangeDropdown(x){
    this.userArray.gpPracticeName = x;
       console.log(this.userArray.gpPracticeName)
       this.getAllGP(this.userArray.gpPracticeName);
   }
   
   public gpChangeDropdown(x){
       this.userArray.gpFullName = x;
       console.log(this.userArray.gpFullName);
   }
   
       public updateUserDetails(){
           console.log("updateUserDetails");
           for(var i = 0; i < this.gp.length; i++) {
               console.log("for loop called");
               if(this.gp[i].gpFullName == this.userArray.gpFullName) {
                   this.userArray.gpID = this.gp[i].gpID;
               }
           }
   
           const body = {
               preferredName: this.userArray.preferredName,
               address: this.userArray.address,
               userID: this.userArray.userID,
               email: this.userArray.email,
               mobilePhoneNumber: this.userArray.mobilePhoneNumber,
               homePhoneNumber: this.userArray.homePhoneNumber,
               workPhoneNumber: this.userArray.workPhoneNumber,
               gpID: this.userArray.gpID
                };

           this.HTTPService.updateUserDetails(body).then((result)=>{
               this.modalRef.hide();
               this.userArray.preferredName = body.preferredName;
               this.userArray.address = body.address;
               this.userArray.email = body.email;
               this.userArray.mobilePhoneNumber = body.mobilePhoneNumber;
               this.userArray.homePhoneNumber = body.homePhoneNumber;
               this.userArray.workPhoneNumber = body.workPhoneNumber;
               this.userArray.gpID = body.gpID;
           }).catch((err)=>{
               console.log(err);
           });
        }
}