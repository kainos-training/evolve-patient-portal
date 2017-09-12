import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Medication } from '../../class/Medication';

@Component({
    selector: 'evolve-repeat-prescription',
    templateUrl: './repeat-prescription.component.html',
    styleUrls: ['./repeat-prescription.component.css']
})
export class RepeatPrescriptionComponent implements OnInit {

    public dataService: DataService;
    public prescriptionList: Medication[];

    constructor(dataService: DataService) {
        this.dataService = dataService;
        this.dataService.getMedicationList(1).subscribe(
            res => this.prescriptionList = res
        );
    }

    ngOnInit() {
    }
}

