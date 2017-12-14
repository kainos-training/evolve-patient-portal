import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'evolve-change-appointment',
  templateUrl: './change-appointment.component.html',
  styleUrls: ['./change-appointment.component.css']
})
export class ChangeAppointmentComponent implements OnInit {
  date:Date;
  dateString:String;
  timeString:String;

  constructor(private data: DataService) { }

  ngOnInit() {
    this.timeString = '12:00:00';
    this.dateString = '2017-12-25';
  }

  onSubmit(){
    //this.date = new Date(this.dateString this.timeString);
    
      console.log(this.date);
    this.data.changeAppointment('2017-12-25 13:15:00');
  }

}