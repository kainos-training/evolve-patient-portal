import {NavigatorGeolocation} from '@ngui/map';
import {Subscription} from 'rxjs/Rx';
import {AppointmentFurtherInfo} from '../../class/appointmentFurtherInfo';
import {Component, OnDestroy, OnInit, TemplateRef} from '@angular/core';
import {BsModalService} from 'ngx-bootstrap/modal';
import {BsModalRef} from 'ngx-bootstrap/modal/modal-options.class';
import {Appointment} from '../../class/appointment';
import {DataService} from '../../services/data.service';

@Component({
    selector: 'evolve-appointment',
    templateUrl: './appointment.component.html',
    styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit, OnDestroy {

    appointments: Appointment[];
    focusedAppointment: AppointmentFurtherInfo;
    private userLocation;
    private subCenter: Subscription;
    private navigatorGeolocation = new NavigatorGeolocation();
    public modalRef: BsModalRef;

    public openModal(template: TemplateRef<any>, appointment: Appointment) {
        // get the appointment further information
        this.data.getAppointmentInformation(appointment.appointmentID).subscribe(
            res => {
                this.focusedAppointment = res[0];
                // show the modal
                this.modalRef = this.modalService.show(template);
            },
            err => console.log(err)
        );
    }

    constructor(private modalService: BsModalService, private data: DataService) {
        data.getAllAppointmentsByUserID(1).subscribe(
            res => this.appointments = res,
            err => console.log(err)
        );
    }

    ngOnInit() {
        // getting the location here helps speed up the map displaying in the map component
        this.subCenter = this.navigatorGeolocation.getCurrentPosition({'timeout': 5000}).subscribe((location) => {
            this.userLocation = location;
        });
    }

    ngOnDestroy() {
        //Called once, before the instance is destroyed.
        //Add 'implements OnDestroy' to the class.
        this.subCenter.unsubscribe();
    }
}