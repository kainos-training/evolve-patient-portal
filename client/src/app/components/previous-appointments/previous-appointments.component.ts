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
import { DatePickerOptions, DateModel } from 'ng2-datepicker';

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
    private date: DateModel;
    private options: DatePickerOptions;
    private filters: string;
    private dateCleared: boolean;
    private filtersOpen = false;
    private modalRef: BsModalRef;
    private id: number;

    @Input() dependantID;

    constructor(private modalService: BsModalService,
        private data: DataService, private switchboard: SwitchBoardService, private ellipsis: EllipsisPipe) {
        this.options = new DatePickerOptions();
        this.options.format = "DD/MM/YYYY";
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

    getAppointmentsForUser(){
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
        //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
        //Add '${implements OnChanges}' to the class.

        // download the new data to update the widgets
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
            dateString = this.date.formatted;
            let newDate = new Date(this.date.month + '/' + this.date.day + '/' + this.date.year);
            this.filter.dateOfAppointment = newDate;
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

