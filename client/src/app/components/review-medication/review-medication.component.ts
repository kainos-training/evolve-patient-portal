import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Medication } from '../../class/Medication';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { Observable } from 'rxjs/Observable';
import { MedicationComment } from '../../class/MedicationComment';
import { MedicationDescription } from '../../class/MedicationDescription';
import { Sanitizer } from '@angular/core';
import { SwitchBoardService } from '../../services/switch-board.service';
import { Subscription } from 'rxjs/Rx';
import { SecurityContext, SimpleChanges, Input } from '@angular/core';
import { User } from '../../class/User';

@Component({
    selector: 'evolve-review-medication',
    templateUrl: './review-medication.component.html',
    styleUrls: ['./review-medication.component.css']
})
export class ReviewMedicationComponent implements OnInit, OnDestroy {

    @Input() dependantID;

    public selectedMedication: Medication;
    public selectedMedicationComments: MedicationComment[];
    public selectedRemovedMedicationComments: MedicationComment[];
    public selectedMedicationHistory: Medication[];
    public modalRef: BsModalRef;
    public medicationsList: Medication[];
    public newComment: string;
    public description: MedicationDescription;
    public sanitizer: Sanitizer;
    public collapsedDescription: boolean;
    private user: User = new User();
    private userSubscription: Subscription;
    private subCenter: Subscription;

    public openModal(meds: Medication, template: TemplateRef<any>) {
        this.collapsedDescription = true;
        this.selectedMedication = meds;
        this.modalRef = this.modalService.show(template);
        let description = this.dataService.getWikiSummary(meds.medicationName);
        
        const id = this.dependantID || this.user.userID; 
        
        this.dataService.getMedicationComments(this.selectedMedication.medicationUserID).subscribe(
            res => this.selectedMedicationComments = res,
            err => console.log(err)
        );
        this.dataService.getRemovedMedicationComments(this.selectedMedication.medicationUserID).subscribe(
            res => this.selectedRemovedMedicationComments = res,
            err => console.log(err)
        );

        if(this.user) {
            if(this.user.userID) {
                this.dataService.getMedicationHistory(this.selectedMedication.medicationID, id).subscribe(
                    res => this.selectedMedicationHistory = res,
                    err => console.log(err)
                );
            }
        }

        this.dataService.getWikiSummary(meds.medicationName).subscribe(
            res => {
                this.description = res;
            }
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
        this.dataService.getRemovedMedicationComments(this.selectedMedication.medicationUserID).subscribe(
            res => this.selectedRemovedMedicationComments = res,
            err => console.log(err)
        );
    }

    public toggleCollapse() {
        this.collapsedDescription = this.collapsedDescription == true ? false : true;
    }

    constructor(private dataService: DataService, private modalService: BsModalService, private switchboard: SwitchBoardService) {
        this.userSubscription = this.switchboard.user$.subscribe(user => {
            this.user = user;
        });
        this.dataService.getUserFromCookie(this.user);
    }

    ngOnInit() {
        this.getMedicationsForUser();
    }

    getMedicationsForUser() {
        this.dataService.getUserFromCookie(this.user);
        if(this.user) {
            // uses dependantID if available, else defaults to logged in use ID
            const id = this.dependantID || this.user.userID; 

            // get the data from the component
            this.dataService.getMedicationList(id).subscribe(
                res => this.medicationsList = res
            );
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        this.getMedicationsForUser();
    }

    ngOnDestroy(): void {
        if (this.userSubscription) {
            this.userSubscription.unsubscribe();
        }
    }
}