import { Subscription } from 'rxjs/Rx';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Medication } from '../../class/Medication';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { Pharmacy } from '../../class/Pharmacy';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
    selector: 'evolve-repeat-prescription',
    templateUrl: './repeat-prescription.component.html',
    styleUrls: ['./repeat-prescription.component.css']
})
export class RepeatPrescriptionComponent implements OnInit, OnInit, OnDestroy {

    public userID: String;
    public dataService: DataService;
    public prescriptionList: Medication[];
    public confirmedPrescriptionList: number[];
    public renewPrescriptionList: Medication[];
    public localPharmacy: Pharmacy[];
    public pharmacy: Pharmacy;
    public modalRef: BsModalRef;
    public deliveryType: boolean;
    public warning: boolean;
    public collectionType = {
        status: null
    };
    public collectionSelected: boolean = false;
    private subCenter: Subscription;

    constructor(dataService: DataService, private modalService: BsModalService) {
        this.renewPrescriptionList = new Array();
        this.dataService = dataService;
        this.confirmedPrescriptionList = new Array();
        this.deliveryType = false;
        this.warning = false;
        this.collectionSelected = false;
    }

    public addToList(medication: Medication) {
        if (this.renewPrescriptionList.length > 0 && this.renewPrescriptionList.find(p => p.medicationName == medication.medicationName)) {
            this.warning = true;
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
        if (this.collectionType.status === 'true') {
            this.deliveryType = true;
        } else {
            this.deliveryType = false;
        }

        for (var i = 0; i < this.prescriptionList.length; i++) {
            this.confirmedPrescriptionList.push(this.prescriptionList[i].medicationUserID);
        }
        console.log('test');
        this.dataService.updatePrescriptionDate(this.confirmedPrescriptionList, this.deliveryType);
        this.ngOnInit();
        this.modalRef.hide();
    }

    public openModal(prescriptionList: Array<Medication>, template: TemplateRef<any>) {
        this.collectionSelected = false;
        this.modalRef = this.modalService.show(template);
    }

    public closeAlert() {
        this.warning = false;
    }
    ngOnInit() {

        this.userID = this.dataService.getCookie();

        this.dataService.getLocalPharmacy(1).subscribe(res => {
            this.localPharmacy = res;
            this.pharmacy = this.localPharmacy[0];
        });

        this.dataService.getRepeatedMedication(this.userID).subscribe(
            res => this.prescriptionList = res
        );
    }

    ngOnDestroy() {
        // Called once, before the instance is destroyed.
        // Add 'implements OnDestroy' to the class.
        this.subCenter.unsubscribe();
    }
}
