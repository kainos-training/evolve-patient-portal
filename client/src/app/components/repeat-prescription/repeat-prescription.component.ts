import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Medication } from '../../class/Medication';
import { ToolTipModule } from 'angular2-tooltip'
@Component({
    selector: 'evolve-repeat-prescription',
    templateUrl: './repeat-prescription.component.html',
    styleUrls: ['./repeat-prescription.component.css']
})
export class RepeatPrescriptionComponent implements OnInit {

    public dataService: DataService;
    public prescriptionList: Medication[];
    public renewPrescriptionList: Medication[];
    
    constructor(dataService: DataService) {
        this.renewPrescriptionList = new Array();
        this.dataService = dataService;
        this.dataService.getMedicationList(1).subscribe(
            res => this.prescriptionList = res
        );
    }

    public addToList(medication: Medication) {
        this.renewPrescriptionList.push(medication);
        alert("New list size: " + this.renewPrescriptionList.length)
    }

    public removeFromList(medication: Medication) {
        var i = this.renewPrescriptionList.indexOf(medication);
        alert(medication.medicationName + " at index " + i + " of the array");
        this.renewPrescriptionList.splice(i, 1);
        console.log(this.renewPrescriptionList.length);
    }

    ngOnInit() {
    }
}

