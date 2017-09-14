import { AppointmentYear } from './AppointmentYear';

export class TimelineStructure{
    private appointmentYear:Array<AppointmentYear>;

    constructor()
    {
        this.appointmentYear = [];
    }

    pushAppointmentYear(yearNumber:number)
    {
        var tempAppointmentYear = new AppointmentYear(yearNumber);
        this.appointmentYear.push(tempAppointmentYear);
    }

    getAppointmentYear(yearIndex:number):AppointmentYear
    {
        return this.appointmentYear[yearIndex];
    }

    getAppYearArray():Array<AppointmentYear>
    {
        return this.appointmentYear;
    }

    public findYearIndex(yearNumber:number):number
    {
        var found:boolean = false;
        var index:number = 0;

        while(index < this.appointmentYear.length && !found)
        {
            var appointmentYear:number = this.appointmentYear[index].getYearNumber();
            
            if(appointmentYear == yearNumber)
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