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
    this.dateString = '2017-12-30';

    this.data.getAppointmentInformation(19).subscribe(
      res => {
        console.log(res[0]);
          this.focusedAppointment = res[0];
      }
    );
  }

  onSubmit(){
    console.log(this.date);
    this.data.changeAppointment(9, '2017-12-30 12:00:00');
  }

  onDelete(){
    this.data.deleteAppointment(9);
  }

  getAppointmentsForUser() {
    this.data.getAllAppointmentsByUserID(9).subscribe(
        res => this.appointments = res
    );
}

}