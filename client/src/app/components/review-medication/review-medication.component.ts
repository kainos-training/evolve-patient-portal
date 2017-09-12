import { Component, TemplateRef } from '@angular/core';
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

@Component({
    selector: 'evolve-review-medication',
    templateUrl: './review-medication.component.html',
    styleUrls: ['./review-medication.component.css']
})
export class ReviewMedicationComponent {

    public selectedMedication: Medication;
    public selectedMedicationComments: MedicationComment[];
    public selectedMedicationHistory: Medication[];
    public userSideEffects: SideEffect[];
    public modalRef: BsModalRef;
    public medicationsList: Medication[];
    public dataService: DataService;
    public newComment: string;
    public newSideEffect: String;
    public description: MedicationDescription;
    public sanitizer: Sanitizer;
    public collapsedDescription: boolean;
    public state : string;
    public openModal(meds: Medication/*, template: TemplateRef<any>*/) {
        this.state = 'meds';
        this.collapsedDescription = true;
        this.selectedMedication = meds;
        //this.modalRef = this.modalService.show(template);
        let description = this.dataService.getWikiSummary(meds.medicationName);

        this.dataService.getMedicationComments(this.selectedMedication.medicationUserID).subscribe(
            res => this.selectedMedicationComments = res
        );

        this.dataService.getMedicationHistory(this.selectedMedication.medicationID, 1).subscribe(
            res => this.selectedMedicationHistory = res
        );

        this.dataService.getWikiSummary(meds.medicationName).subscribe(
            res => { this.description = res; }
        );
    }

    public openPrescriptionModal(template: TemplateRef<any>) {
        this.modalRef = this.modalService.show(template);
    }

    public removeComment(medicationUserCommentID) {
        this.dataService.removeMedicationComment(medicationUserCommentID);
        this.refreshMedicationComments();
    }

    public removeSideEffect(userSideEffectID) {
        this.dataService.removeUserSideEffect(userSideEffectID);
        this.refreshUserSideEffects();
    }

    public addComment() {
        if (this.newComment != null) {
            this.dataService.addMedicationComment(this.selectedMedication.medicationUserID, this.newComment);
            this.refreshMedicationComments();
            this.newComment = null;
        }
    }

    public addSideEffect() {
        if (this.newSideEffect != null) {
            this.dataService.addUserSideEffect(this.dataService.getCookie(), this.newSideEffect);
            this.refreshUserSideEffects();
            this.newSideEffect = null;
        }
    }

    public refreshMedicationComments() {
        this.dataService.getMedicationComments(this.selectedMedication.medicationUserID).subscribe(
            res => this.selectedMedicationComments = res
        );
    }

    public refreshUserSideEffects() {
        this.dataService.getUserSideEffects(this.dataService.getCookie()).subscribe(
            res => this.userSideEffects = res
        );
    }

    public toggleCollapse() {
        this.collapsedDescription = this.collapsedDescription == true ? false : true;
    }

    public closeMeds() {
        this.state = 'prescription';
    }

    constructor(dataService: DataService, private modalService: BsModalService) {
        this.state = "prescription";
        this.dataService = dataService;
        var userID = this.dataService.getCookie();
        dataService.getMedicationList(userID).subscribe(
            res => this.medicationsList = res
        );

        this.dataService.getUserSideEffects(userID).subscribe(
            res => { this.userSideEffects = res }
        );
    }
}
