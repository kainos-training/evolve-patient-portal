import { Subscription } from 'rxjs/Rx';
import { AppointmentFurtherInfo } from '../../class/AppointmentFurtherInfo';
import { Component, OnDestroy, OnInit, TemplateRef, Input, SimpleChanges, OnChanges } from '@angular/core';
import { Appointment } from '../../class/Appointment';
import { DataService } from '../../services/data.service';
import { SwitchBoardService } from '../../services/switch-board.service';
import { User } from '../../class/User';
import { EllipsisPipe } from '../../utils/ellipsis.pipe';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { IMyDpOptions, IMyDateModel } from 'mydatepicker';

@Component({
    selector: 'evolve-previous-appointments',
    templateUrl: './previous-appointments.component.html',
    styleUrls: ['./previous-appointments.component.css']
})
export class PreviousAppointmentsComponent implements OnInit, OnDestroy, OnChanges {

    private appointments: Appointment[];
    private focusedAppointment: AppointmentFurtherInfo;
    private user: User = new User();
    private userSubscription: Subscription;
    private collapsedComment = true;
    private order = 'dateOfAppointment';
    private filter = new Appointment();
    private filterType: string;
    private date: Date;
    private filters: string;
    private dateCleared: boolean;
    private filtersOpen = false;
    private modalRef: BsModalRef;
    private id: number;

    public myDatePickerOptions: IMyDpOptions = {
        // other options...
        dateFormat: 'dd/mm/yyyy',
    };
    // dateChanged callback function called when the user select the date. This is mandatory callback
    // in this option. There are also optional inputFieldChanged and calendarViewChanged callbacks.
    onDateChanged(event: IMyDateModel) {
        this.date = event.jsdate;
    }

    @Input() dependantID;

    constructor(private modalService: BsModalService,
        private data: DataService, private switchboard: SwitchBoardService, private ellipsis: EllipsisPipe) {
        this.userSubscription = this.switchboard.user$.subscribe(user => {
            this.user = user;
        });
    }

    public openModal(appointment: Appointment, template: TemplateRef<any>) {
        this.data.getAppointmentInformation(appointment.appointmentID).subscribe(
            res => {
                this.focusedAppointment = new AppointmentFurtherInfo();
                this.focusedAppointment.departmentName = res[0].departmentName;
                this.focusedAppointment.locationAddress = res[0].locationAddress;
                this.focusedAppointment.dateOfAppointment = res[0].dateOfAppointment;
                this.focusedAppointment.clinicianName = res[0].clinicianName;
                this.focusedAppointment.comment = res[0].comment;

                this.modalRef = this.modalService.show(template);
            }
        );
    }

    public toggleFilters() {
        this.filtersOpen = !this.filtersOpen;
    }

    ngOnInit() {
        this.getAppointmentsForUser();
    }

    getAppointmentsForUser() {
        if (this.dependantID || this.user) {
            if (this.dependantID) {
                this.id = this.dependantID;
            }
            else if (this.user.userID) {
                this.id = this.user.userID;
            }
        }
        this.data.getUserFromCookie(this.user);
        this.data.getPreviousAppointments(this.id).subscribe(
            res => { this.appointments = res; }
        );
    }


    ngOnChanges(changes: SimpleChanges) {
        this.getAppointmentsForUser();
    }
    ngOnDestroy() {
        if (this.userSubscription)
            this.userSubscription.unsubscribe();
    }

    toggleCollapse() {
        this.collapsedComment = !this.collapsedComment;
    }

    toggleOrder() {
        this.order = this.order == 'type' ? 'dateOfAppointment' : 'type';
    }

    changeFilterType(type: string) {
        this.filterType = type;
    }

    updateFilter(type: string) {
        this.filters = "";
        let dateString;

        if (this.date) {
            this.filter.dateOfAppointment = this.date;
            this.filters += "Date";
        }
        else {
            this.filter.dateOfAppointment = undefined;
        }

        if (this.filterType) {
            if (this.filterType != "") {
                this.filters += this.filters == "" ? "Speciality" : " and Speciality";
                this.filter.type = this.filterType;
            }
        }
        else {
            this.filter.type = undefined;
        }
        this.ngOnInit();
        this.filtersOpen = false;
    }

    clearFilter() {
        this.date = undefined;
        this.filterType = undefined;
        this.filters = "";
        this.filter = new Appointment();
        this.filtersOpen = false;
    }
}

