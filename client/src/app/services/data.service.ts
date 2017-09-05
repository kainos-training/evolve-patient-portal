import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable()
export class DataService {

    constructor(private http: HttpClient) {
        console.log(this.http.get('/api/testQuery').subscribe());
    }

    public requestReset(username: string): boolean{
        //Do a Post to server that checks if username exists, sends email or returns an error
        alert("In data service requestReset()");
        return false;
    }

}
