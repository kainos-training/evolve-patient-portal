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
  appointmentString:String[] = [];
  userString: String[] = [];

  constructor(private data: DataService) { }

  ngOnInit() {
    this.timeString = '12:00:00';
    this.appointmentString.push("Pre-Op Assessment");
    this.appointmentString.push("Emergency Surgery");
    this.appointmentString.push("GP Appointment");
    this.appointmentString.push("Check-up");
    console.log(this.appointmentString);
  this.userString.push("Jane Smith");
    this.userString.push("Shannon Murray");
    this.userString.push("Andrew Smith");
      this.userString.push("Kate Smith");
     this.userString.push("Chloe Smith");
     this.userString.push("Jack Daniels");
     this.userString.push("Andrew Jackson");
     this.userString.push("Bill Smith");
    }
  
    onSubmit(){
      this.date = new Date(this.dateString+' '+this.timeString);
      
       console.log(this.date);
      this.data.addAppointment(null, 1, 1, 1, '2017-12-25 12:00:00', "Hurt Face", 1);
    }
  
  }

