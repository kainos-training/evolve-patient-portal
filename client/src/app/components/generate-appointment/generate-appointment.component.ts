import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'evolve-generate-appointment',
  templateUrl: './generate-appointment.component.html',
  styleUrls: ['./generate-appointment.component.css']
})
export class GenerateAppointmentComponent implements OnInit {
  date:Date;
  dateString:String;
  timeString:String;

  constructor(private data: DataService) { }

  ngOnInit() {
    this.timeString = '12:00:00';
  }

  onSubmit(){
    this.date = new Date(this.dateString+' '+this.timeString);
    
      console.log(this.date);
    this.data.addAppointment(null, 1, 1, 1, '2017-12-25 12:00:00', "Hurt Face", 1);
  }

}
