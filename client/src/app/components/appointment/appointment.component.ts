import {NavigatorGeolocation} from '@ngui/map';
import {Subscription} from 'rxjs/Rx';
import {AppointmentFurtherInfo} from '../../class/AppointmentFurtherInfo';
import {Component, OnDestroy, OnInit, TemplateRef} from '@angular/core';
import {BsModalService} from 'ngx-bootstrap/modal';
import {BsModalRef} from 'ngx-bootstrap/modal/modal-options.class';
import {Appointment} from '../../class/Appointment';
import {DataService} from '../../services/data.service';
import {SwitchBoardService} from '../../services/switch-board.service';
import {User} from '../../class/User';

@Component({
    selector: 'evolve-appointment',
    templateUrl: './appointment.component.html',
    styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit, OnDestroy {

    private appointments: Appointment[];
    private focusedAppointment: AppointmentFurtherInfo;
    private userLocation;
    private subCenter: Subscription;
    private navigatorGeolocation = new NavigatorGeolocation();
    private modalRef: BsModalRef;
    private user: User = new User();
    private userSubscription: Subscription;

    constructor(private modalService: BsModalService, private data: DataService, private switchboard: SwitchBoardService) {
        this.userSubscription = this.switchboard.user$.subscribe(user => {
            this.user = user;
        });

        this.subCenter = this.navigatorGeolocation.getCurrentPosition({'timeout': 10000}).subscribe((location) => {
            this.userLocation = location;
        });
    }
    
    public openModal(template: TemplateRef<any>, appointment: Appointment) {
        this.data.getAppointmentInformation(appointment.appointmentID).subscribe(
            res => {
                this.focusedAppointment = res[0];
                this.modalRef = this.modalService.show(template);
            }
        );
    }

    ngOnInit() {
        this.data.getUserFromCookie(this.user);
        if(this.user)
            if(this.user.userID)
                this.data.getAllAppointmentsByUserID(this.user.userID).subscribe(
                    res => this.appointments = res
                );
    }

    ngOnDestroy() {
        if(this.userSubscription)
            this.userSubscription.unsubscribe();
        if(this.subCenter)
            this.subCenter.unsubscribe();
    }
}