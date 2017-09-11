import { Component, OnInit, TemplateRef } from '@angular/core';
import { DataService } from '../services/data.service';
import { Medication } from '../Medication';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { Observable } from 'rxjs/Observable';
import { MedicationComment } from '../MedicationComment';
import { MedicationDescription } from '../MedicationDescription';
import { Sanitizer } from '@angular/core';
import { SecurityContext } from '@angular/core';

@Component({
    selector: 'evolve-review-medication',
    templateUrl: './review-medication.component.html',
    styleUrls: ['./review-medication.component.css']
})
export class ReviewMedicationComponent implements OnInit {

    public selectedMedication: Medication;
    public selectedMedicationComments: MedicationComment[];
    public selectedRemovedMedicationComments: MedicationComment[];
    public selectedMedicationHistory: Medication[]
    public modalRef: BsModalRef;
    public medicationsList: Medication[];
    public dataService: DataService;
    public newComment: string;
    public description: MedicationDescription;
    public sanitizer: Sanitizer;
    public collapsedDescription: boolean;

    public openModal(meds: Medication, template: TemplateRef<any>) {
        this.collapsedDescription = true;
        this.selectedMedication = meds;
        this.modalRef = this.modalService.show(template);
        let description = this.dataService.getWikiSummary(meds.medicationName);
        console.log(description)
        this.dataService.getMedicationComments(this.selectedMedication.medicationUserID).subscribe(
            res => this.selectedMedicationComments = res,
            err => console.log(err) 
        )
        this.dataService.getRemovedMedicationComments(this.selectedMedication.medicationUserID).subscribe(
            res => this.selectedRemovedMedicationComments = res,
            err => console.log(err) 
        )
        this.dataService.getMedicationHistory(this.selectedMedication.medicationID, 1).subscribe(
            res => this.selectedMedicationHistory = res,
            err => console.log(err) 
        )
        console.log(this.selectedMedication);

        this.dataService.getWikiSummary(meds.medicationName).subscribe(
            res => {this.description = res; /*this.description.description = this.sanitizer.sanitize(SecurityContext.HTML, this.description.description);*/},
            err => console.log(err)
        )
    }

    public removeComment(medicationUserCommentID) {
        this.dataService.removeMedicationComment(medicationUserCommentID);
        this.refreshMedicationComments();
    }

    public reAddComment(medicationUserCommentID) {
        this.dataService.reAddMedicationComment(medicationUserCommentID);
        this.refreshMedicationComments();
    }

    public addComment() {
        if(this.newComment != null){
            this.dataService.addMedicationComment(this.selectedMedication.medicationUserID, this.newComment);
            this.refreshMedicationComments();
            this.newComment=null;
        }
    }

    public refreshMedicationComments() {
        this.dataService.getMedicationComments(this.selectedMedication.medicationUserID).subscribe(
            res => this.selectedMedicationComments = res,
            err => console.log(err) 
        );
        this.dataService.getRemovedMedicationComments(this.selectedMedication.medicationUserID).subscribe(
            res => this.selectedRemovedMedicationComments = res,
            err => console.log(err) 
        );
        console.log("refreshing");
    }

    public toggleCollapse(){
        console.log("Collapsing div");
        this.collapsedDescription = this.collapsedDescription == true ? false : true;
    }

    constructor(dataService: DataService, private modalService: BsModalService) {
        console.log("Calling POST...");
        this.dataService = dataService;
        dataService.getMedicationList(1).subscribe(
            res => this.medicationsList = res,
            err => console.log(err)
        )
    }

    ngOnInit() {
    }

}
