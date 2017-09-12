import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
    selector: 'evolve-repeat-prescription',
    templateUrl: './repeat-prescription.component.html',
    styleUrls: ['./repeat-prescription.component.css']
})
export class RepeatPrescriptionComponent implements OnInit {

    public dataService: DataService;

    constructor(dataService: DataService) {
        this.dataService = dataService;
        let userID = this.dataService.getCookie();
        console.log(JSON.stringify(userID));
    }

    ngOnInit() {
    }
}

