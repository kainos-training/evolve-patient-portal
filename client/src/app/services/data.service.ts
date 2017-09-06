import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Http} from "@angular/http";
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

    constructor(private http: HttpClient) {
        console.log(this.http.get('/api/testQuery').subscribe());
    }

    public requestReset(thisUsername: string): void{
        //Do a Post to server that checks if username exists, sends email or returns an error
        alert("In data service requestReset()");
        const user = {username: thisUsername};
        const options = {
            headers: new HttpHeaders().set('Content-Type', 'application/json'),
        };
        this.http.post("/api/user", user, options).subscribe(res =>{console.log(res)});
    }

}
