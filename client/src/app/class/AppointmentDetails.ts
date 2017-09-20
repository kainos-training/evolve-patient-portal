export class AppointmentDetails{
    private appointmentID:number;
    private appointmentType:string;
    private appointmentDate:Date;
    private departmentName:string;

    constructor(appointmentID:number,appointmentType:string, appointmentDetails:Date, departmentName:string)
    {
        this.appointmentID = appointmentID;
        this.appointmentType = appointmentType;
        this.appointmentDate = appointmentDetails;
        this.departmentName = departmentName;
    }

    getAppID():number
    {
        return this.appointmentID;
    }

    getAppType():string
    {
        return this.appointmentType;
    }

    getAppDate():Date
    {
        return this.appointmentDate;
    }

    getDepName():string
    {
        return this.departmentName;
    }
}