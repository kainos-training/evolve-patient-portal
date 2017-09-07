import {Component, OnInit} from '@angular/core';
import {DataService} from '../services/data.service';
import * as $ from 'jquery';
import {User} from '../user';
import {SwitchBoardService} from '../services/switch-board.service';


@Component({
    selector: 'evolve-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    constructor() {
        // $(function() {
        //     console.log('jquery is working');
        // });
    }

}
