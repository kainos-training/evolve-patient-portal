import { AppointmentDetails } from "./AppointmentDetails";

export class AppointmentMonth {
    private monthString:string;
    private appointmentDetails:Array<AppointmentDetails>;

    constructor(pMonthString:string)
    {
        this.appointmentDetails = [];
        this.monthString = pMonthString;
    }

    pushAppointmentDetails(appointmentID:number, appointmentType:string, appointmentDate:Date, departmentName:string)
    {
        var tempAppDet:AppointmentDetails = new AppointmentDetails(appointmentID,appointmentType, appointmentDate, departmentName);
        this.appointmentDetails.push(tempAppDet);
    }

    getMonthName():string
    {
        return this.monthString;
    }

    getAppDetsArray():Array<AppointmentDetails>
    {
        return this.appointmentDetails;
    }
}