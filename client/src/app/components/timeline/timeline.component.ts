import { Component, OnInit, TemplateRef } from '@angular/core';
import { DataService } from "../../services/data.service";
import { Subscription } from 'rxjs/Subscription';
import { SwitchBoardService } from '../../services/switch-board.service';
import { User } from "../../class/User";
import { TimelineStructure } from "../../class/TimelineStructure";
import { AppointmentCount } from '../../class/AppointmentCount';
import { AppointmentFurtherInfo } from '../../class/AppointmentFurtherInfo';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { NavigatorGeolocation } from '@ngui/map';

@Component({
    selector: 'evolve-timeline',
    templateUrl: './timeline.component.html',
    styleUrls: ['./timeline.component.css'],
    providers: [DataService]
})
export class TimelineComponent implements OnInit {
    private timelineStructure: TimelineStructure;
    private user: User = new User();
    private userSubscription: Subscription;
    private currentYear: number;
    private previousYearsToLoad: number;
    private futureYearsToLoad: number;
    private countOfFutureYearsToLoad: number;
    private countOfPreviousYearstoLoad: number;
    private appointmentCount: AppointmentCount;
    private loadFuture:boolean;
    private loadPrevious:boolean;

    //appointment modal 
    private modalRef: BsModalRef;
    private mapPath: string;
    private focusedAppointment: AppointmentFurtherInfo;
    private subCenter: Subscription;  
    private navigatorGeolocation = new NavigatorGeolocation(); 
    private userLocation;    
    

    constructor(private modalService:BsModalService, private data: DataService, private switchboard: SwitchBoardService) {
        this.userSubscription = this.switchboard.user$.subscribe(user => this.user = user);

        this.subCenter = this.navigatorGeolocation.getCurrentPosition({'timeout': 10000}).subscribe((location) => {
            this.userLocation = location;
        });

        var currentDate: Date = new Date();
        this.currentYear = currentDate.getFullYear();
        this.loadFuture = true;
        this.loadPrevious = true;
    }

    ngOnInit() {
        this.data.getUserFromCookie(this.user);
        this.previousYearsToLoad = 1;
        this.futureYearsToLoad = 1;
        this.fetchData();
    }

    fetchData() {
        this.timelineStructure = new TimelineStructure();

        if (this.user) {
            if (this.user.userID) {
                this.data.getTimelineAppointments(this.user.userID, this.futureYearsToLoad, this.previousYearsToLoad).subscribe(
                    res => {
                        for (let appointment of res) {

                            var indexOfYear: number = this.timelineStructure.findYearIndex(appointment.dateYear);
                            if (indexOfYear == -1) {
                                this.timelineStructure.pushAppointmentYear(appointment.dateYear);
                                indexOfYear = this.timelineStructure.findYearIndex(appointment.dateYear);
                            }

                            var indexOfMonth: number = this.timelineStructure.getAppointmentYear(indexOfYear).findMonthIndex(appointment.dateMonth);
                            if (indexOfMonth == -1) {
                                this.timelineStructure.getAppointmentYear(indexOfYear).pushAppointmentMonth(appointment.dateMonth);
                                var indexOfMonth: number = this.timelineStructure.getAppointmentYear(indexOfYear).findMonthIndex(appointment.dateMonth);
                            }

                            this.timelineStructure
                                .getAppointmentYear(indexOfYear)
                                .getAppointmentMonth(indexOfMonth)
                                .pushAppointmentDetails(appointment.appointmentID,appointment.type, appointment.dateOfAppointment, appointment.departmentName);
                        }
                    }
                );
            }
        }
    }

    ngOnDestroy(): void {
        if (this.userSubscription) {
            this.userSubscription.unsubscribe();
        }

        if(this.subCenter) {
            this.subCenter.unsubscribe();
        }
    }

    onYearClicked($event) {
        $($event.target).siblings('.expandable').slideToggle();
    }

    increasePreviousYears()
    {
        if (this.user) {
            if (this.user.userID) {
                this.data.countTimelineAppointmentPrevious(this.previousYearsToLoad, this.user.userID).subscribe(
                    res => {
                        this.countOfPreviousYearstoLoad = res[0].appCount;
                        if(res[0].appCount > 0)
                        {
                            this.previousYearsToLoad++;
                            this.fetchData();
                        }
                        else
                        {
                            this.loadPrevious = false;
                        }
                    }
                );
            }
        }
    }

    increaseFutureYears()
    {
        if (this.user) {
            if (this.user.userID) {
                this.data.countTimelineAppointmentFuture(this.futureYearsToLoad, this.user.userID).subscribe(
                    res => {
                        this.countOfFutureYearsToLoad = res[0].appCount;
                        if(res[0].appCount > 0)
                        {
                            this.futureYearsToLoad++;
                            this.fetchData();
                        }
                        else
                        {
                            this.loadFuture = false;
                        }
                    }
                );
            }
        }
    }

    //appointment modal
    openAppointmentModal(template: TemplateRef<any>, appointmentID:number)
    {
         this.data.getAppointmentInformation(appointmentID).subscribe(
            res => {
                this.focusedAppointment = res[0];
                this.mapPath = '../assets/hospitals/' + this.focusedAppointment.locationID + '/' + this.focusedAppointment.departmentID;
                this.modalRef = this.modalService.show(template);
                this.focusedAppointment.showLocalMap = false;
                this.focusedAppointment.showGoogleMap = false;
            }
        ); 
    }

    private toggle(name):void {
        this.focusedAppointment[name] = !this.focusedAppointment[name];
    }

    getColor(colorChoice:String){
        console.log(colorChoice);
        if(colorChoice=='Community Diabetes Team'){
            return '#006435';
        }
        if(colorChoice=='GP'){
            return '#F47738';
        }
        if(colorChoice=='Orthopeadic'){
            return '#912B88';
        }
        if(colorChoice=='Oncology'){
            return '#005EA5';
        }

    }

    
}
