import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {SimpleTimer} from 'ng2-simple-timer';
import {DataService} from '../services/data.service';

@Component({
    selector: 'evolve-error-page',
    templateUrl: './error-page.component.html',
    styleUrls: ['./error-page.component.css']
})
export class ErrorPageComponent implements OnInit, OnDestroy {

    timerID: string;
    timeleft: number;
    flag: boolean;

    constructor(private router: Router, private st: SimpleTimer, private data: DataService) {
        this.timeleft = 6;
        this.flag = false;
    }

    ngOnInit() {
        this.st.newTimer('5sec', 1);
        this.subscribeTimer();
    }

    public subscribeTimer(){
        this.timerID = this.st.subscribe('5sec', () => this.timerCallback());
    }

    public unsubscribeTimer(){
        this.st.unsubscribe(this.timerID);
    }

    public doRedirect() {
        const url = '/login';
        this.router.navigateByUrl(url);
    }

    ngOnDestroy() {
        this.unsubscribeTimer();
        this.st.delTimer('5sec');
    }

    timerCallback(): void {
        this.timeleft--;
        if(this.timeleft == 0){
            this.doRedirect();
        }
    }

}
