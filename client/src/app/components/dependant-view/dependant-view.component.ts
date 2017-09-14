import { Subscription } from 'rxjs/Rx';
import { SwitchBoardService } from '../../services/switch-board.service';
import { User } from '../../class/User';
import { DataService } from '../../services/data.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import { Medication } from '../../class/Medication';
import { MedicationComment } from '../../class/MedicationComment';
import { ReviewMedicationComponent } from '../review-medication/review-medication.component';
@Component({
    selector: 'evolve-dependant-view',
    templateUrl: './dependant-view.component.html',
    styleUrls: ['./dependant-view.component.css'],
    providers: [{ provide: BsDropdownConfig, useValue: { autoClose: false } }]
})
export class DependantViewComponent implements OnInit, OnDestroy {

    private viewingDependant: User;
    private dependantSubscription: Subscription;

    constructor(private data: DataService, private switchboard: SwitchBoardService) {

    }

    ngOnInit() {
        //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        //Add 'implements O nInit' to the class.
        this.dependantSubscription = this.switchboard.viewingDependant$.subscribe(
            dependant => this.viewingDependant = dependant
        );
    }

    ngOnDestroy() {
        //Called once, before the instance is destroyed.
        //Add 'implements OnDestroy' to the class.
        this.dependantSubscription.unsubscribe();
    }

    dropdownOptionClicked($event, selectedDependant) {
        // prevent the page jumping
        $event.preventDefault();
        this.viewingDependant = selectedDependant;
    }
}
