import { Component } from '@angular/core';
import {DataService} from "../services/data.service";
import * as $ from 'jquery';


@Component({
  selector: 'map-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Evolve patient portal';

  constructor(){
      $(function() {
          console.log('jquery is working');
      });
  }
}
