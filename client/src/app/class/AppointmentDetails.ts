export class AppointmentDetails{
    private appointmentType:string;
    private appointmentDate:Date;
    private departmentName:string;

    constructor(appointmentType:string, appointmentDetails:Date, departmentName:string)
    {
        this.appointmentType = appointmentType;
        this.appointmentDate = appointmentDetails;
        this.departmentName = departmentName;
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