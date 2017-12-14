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
  public focusedAppointment: AppointmentFurtherInfo;

  constructor(private data: DataService) { }

  ngOnInit() {
    this.timeString = '12:00:00';
    this.dateString = '2017-12-25';

    this.data.getAppointmentInformation(6).subscribe(
      res => {
        console.log(res[0]);
          this.focusedAppointment = res[0];
      }
    );
  }

  onSubmit(){
    console.log(this.date);
    this.data.changeAppointment(1, '2017-12-30 12:00:00');
  }

  onDelete(){
    this.data.deleteAppointment(1);
  }

  getAppointmentsForUser() {
    this.data.getAllAppointmentsByUserID(6).subscribe(
        res => this.appointments = res
    );
}

}