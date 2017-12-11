import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'evolve-generate-appointment',
  templateUrl: './generate-appointment.component.html',
  styleUrls: ['./generate-appointment.component.css']
})
export class GenerateAppointmentComponent implements OnInit {

  constructor(private data: DataService) { }

  ngOnInit() {
  }

  onSubmit(){

    this.data.addAppointment(null, 1, 1, 1, '2018-11-15 12:15:05', "Hurt Arm", 1);
  }

}
