import { Component, TemplateRef, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Medication } from '../../class/Medication';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { Observable } from 'rxjs/Observable';
import { MedicationComment } from '../../class/MedicationComment';
import { MedicationDescription } from '../../class/MedicationDescription';
import { SideEffect } from '../../class/SideEffect';
import { Sanitizer } from '@angular/core';
import { SecurityContext } from '@angular/core';
import {AccordionModule} from 'ngx-bootstrap/accordion';

import { User } from '../../class/User';
import { SwitchBoardService } from '../../services/switch-board.service';
import { Subscription } from 'rxjs/Rx';
@Component({
    selector: 'evolve-review-medication',
    templateUrl: './review-medication.component.html',
    styleUrls: ['./review-medication.component.css']
})
export class ReviewMedicationComponent implements OnInit, OnDestroy {
    public selectedMedication: Medication;
    public selectedMedicationComments: MedicationComment[];
    public selectedMedicationHistory: Medication[];
    public selectedRemovedMedicationComments: MedicationComment[];
    public modalRef: BsModalRef;
    public medicationsList: Medication[];
    public newComment: string;
    public description: MedicationDescription;
    public sanitizer: Sanitizer;
    public collapsedDescription: boolean;
    public showPrescriptionHistory: boolean;
    private user: User = new User();
    private userSubscription: Subscription;
    private dataService: DataService;
    public prescriptionHistoryExists: boolean;

    public openModal(meds: Medication, template: TemplateRef<any>) {

        this.collapsedDescription = true;
        this.selectedMedication = meds;
        this.showPrescriptionHistory = false;

        this.modalRef = this.modalService.show(template);
        let description = this.dataService.getWikiSummary(meds.medicationName);

        this.dataService.getMedicationComments(this.selectedMedication.medicationUserID).subscribe(
            res => this.selectedMedicationComments = res,
            err => console.log(err)
        );
        this.dataService.getRemovedMedicationComments(this.selectedMedication.medicationUserID).subscribe(
            res => this.selectedRemovedMedicationComments = res,
            err => console.log(err)
        );

        if (this.user){
            if (this.user.userID){
                this.dataService.getMedicationHistory(this.selectedMedication.medicationID, this.user.userID).subscribe(
                    res => this.selectedMedicationHistory = res
                );
            }
        }
        this.dataService.getWikiSummary(meds.medicationName).subscribe(
            res => {
                this.description = res;
            }
        );
    }

    public openPrescriptionModal(template: TemplateRef<any>) {
        this.modalRef = this.modalService.show(template);
    }

    public toggleCollapse() {
        this.collapsedDescription = this.collapsedDescription == true ? false : true;
    }

    public displayPrescriptionHistory() {
        this.showPrescriptionHistory = !this.showPrescriptionHistory;
    }

    constructor(dataService: DataService, private modalService: BsModalService, private switchboard: SwitchBoardService) {
        this.dataService = dataService;
        console.log("User Id in this constructor: " + this.user.userID);
    }

    ngOnInit(): void {
        this.switchboard.user$.subscribe(usr => this.user = usr);
        this.dataService.getUserFromCookie(this.user);

        console.log("User Id in this constructor: " + this.user.userID);
        this.dataService.getMedicationList(this.user.userID).subscribe(
            res => this.medicationsList = res
        );
        if (this.user)
            if (this.user.userID)
                this.dataService.getMedicationList(this.user.userID).subscribe(
                    res => this.medicationsList = res
                );
    }

    ngOnDestroy(): void {
        if (this.userSubscription) {
            this.userSubscription.unsubscribe();
        }
    }
}
