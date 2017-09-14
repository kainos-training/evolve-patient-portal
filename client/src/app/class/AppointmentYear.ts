import { AppointmentMonth } from "./AppointmentMonth";

export class AppointmentYear {
    private yearNumber:number;
    private appointmentMonth:Array<AppointmentMonth>;

    constructor(yearNumber:number)
    {
        this.appointmentMonth = [];  
        this.yearNumber = yearNumber;
    }

    pushAppointmentMonth(monthString:string)
    {
        var tempAppointmentMonth:AppointmentMonth = new AppointmentMonth(monthString);
        this.appointmentMonth.push(tempAppointmentMonth);
    }

    getAppointmentMonth(monthIndex:number):AppointmentMonth
    {
        return this.appointmentMonth[monthIndex];
    }

    getAppMonthArray():Array<AppointmentMonth>
    {
        return this.appointmentMonth;
    }

    getYearNumber():number
    {
        return this.yearNumber;
    }

    public findMonthIndex(monthString:string):number
    {
        var found:boolean = false;
        var index:number = 0;

        while(index < this.appointmentMonth.length && !found)
        {
            var tempAppointmentMonthName = this.appointmentMonth[index].getMonthName();
            
            if(tempAppointmentMonthName == monthString)
            {
                found = true;
            }
            else
            {
                index++;                
            }
        }
        if(!found)
        { index = -1;}
        return index;
    }
}