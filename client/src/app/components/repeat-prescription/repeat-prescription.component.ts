import { Component, OnInit, TemplateRef } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Medication } from '../../class/Medication';
import { ToolTipModule } from 'angular2-tooltip';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'evolve-repeat-prescription',
    templateUrl: './repeat-prescription.component.html',
    styleUrls: ['./repeat-prescription.component.css']
})
export class RepeatPrescriptionComponent implements OnInit {

    public dataService: DataService;
    public prescriptionList: Medication[];
    public renewPrescriptionList: Medication[];
    public modalRef: BsModalRef;
    public collectionType = {
        status: null
    };

    constructor(dataService: DataService, private modalService: BsModalService) {
        this.renewPrescriptionList = new Array();
        this.dataService = dataService;
        
    }

    public addToList(medication: Medication) {
        if (this.renewPrescriptionList.length > 0 && this.renewPrescriptionList.find(p => p.medicationName == medication.medicationName)) {
            alert("ALREADY REQUESTED!");
        } else {
            this.renewPrescriptionList.push(medication);
        }
    }

    public removeFromList(medication: Medication) {
        var i = this.renewPrescriptionList.indexOf(medication);
        this.renewPrescriptionList.splice(i, 1);
    }

    public requestPrescription(prescriptionList: Array<Medication>) {
        console.log(this.collectionType.status);
        alert(prescriptionList[0].medicationUserID + " " + this.collectionType.status);
    }

    public openModal(prescriptionList: Array<Medication>, template: TemplateRef<any>) {
        this.modalRef = this.modalService.show(template);

    }

    ngOnInit() {
        this.dataService.getRepeatedMedication(1).subscribe(
            res => this.prescriptionList = res
        );
    }
}
