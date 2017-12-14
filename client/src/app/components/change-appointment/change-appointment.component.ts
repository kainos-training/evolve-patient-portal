import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Appointment } from '../../class/Appointment';
import { AppointmentFurtherInfo } from '../../class/AppointmentFurtherInfo';

@Component({
  selector: 'evolve-change-appointment',
  templateUrl: './change-appointment.component.html',
  styleUrls: ['./change-appointment.component.css']
})
export class ChangeAppointmentComponent implements OnInit {
  date:Date;
  dateString:String;
  timeString:String;
  private appointments: Appointment[];
  private focusedAppointment: AppointmentFurtherInfo;

  constructor(private data: DataService) { }

  ngOnInit() {
    this.timeString = '12:00:00';
    this.dateString = '2017-12-25';

    this.data.getAppointmentInformation(7).subscribe(
      res => {
          this.focusedAppointment = res[0];
      }
    );
  }

  onSubmit(){
    //this.date = new Date(this.dateString this.timeString);
    
      console.log(this.date);
    this.data.changeAppointment('2017-12-25 13:15:00');
  }

  onDelete(){
    //this.date = new Date(this.dateString this.timeString);
    
      console.log(this.date);
    this.data.deleteAppointment();
  }

  getAppointmentsForUser() {
    this.data.getAllAppointmentsByUserID(7).subscribe(
        res => this.appointments = res
    );
}

}