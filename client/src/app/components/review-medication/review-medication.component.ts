import { Component, TemplateRef } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Medication } from '../../class/Medication';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { Observable } from 'rxjs/Observable';
import { MedicationComment } from '../../class/MedicationComment';
import { MedicationDescription } from '../../class/MedicationDescription';
import { Sanitizer } from '@angular/core';
import { SecurityContext } from '@angular/core';
import { RepeatPrescriptionComponent } from  '../repeat-prescription/repeat-prescription.component';

@Component({
    selector: 'evolve-review-medication',
    templateUrl: './review-medication.component.html',
    styleUrls: ['./review-medication.component.css']
})
export class ReviewMedicationComponent {

    public selectedMedication: Medication;
    public selectedMedicationComments: MedicationComment[];
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

    public removeComment(medicationUserCommentID) {
        this.dataService.removeMedicationComment(medicationUserCommentID);
        this.refreshMedicationComments();
    }

    public addComment() {
        if (this.newComment != null) {
            this.dataService.addMedicationComment(this.selectedMedication.medicationUserID, this.newComment);
            this.refreshMedicationComments();
            this.newComment = null;
        }
    }

    public refreshMedicationComments() {
        this.dataService.getMedicationComments(this.selectedMedication.medicationUserID).subscribe(
            res => this.selectedMedicationComments = res
        );
    }

    public toggleCollapse() {
        this.collapsedDescription = this.collapsedDescription == true ? false : true;
    }

    constructor(dataService: DataService, private modalService: BsModalService) {
        this.dataService = dataService;
        dataService.getMedicationList(1).subscribe(
            res => this.medicationsList = res
        )
    }
}
