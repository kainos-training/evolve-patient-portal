import { Component } from '@angular/core';
import { DataService } from "../services/data.service";
import * as $ from 'jquery';


@Component({
    selector: 'evolve-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'Evolve Patient Portal';

    constructor(private data: DataService) { }
}
