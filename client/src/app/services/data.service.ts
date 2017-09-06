import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { User } from './../user';
import * as $ from 'jquery';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class DataService {

    constructor(private http: HttpClient) {
        console.log(this.http.get('/api/testQuery').subscribe());
    }
    public login(user: User) {
        const body = {
            "username": user.username,
            "password": user.password
        };
        const options = {
            headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded'),
        };

        this.http.post('/api/auth/login', $.param(body), options)
            .subscribe(data => {
                console.log("SUCCESS:", data);
                return true;
            }, error => {
                console.log(error);
                return false;
            });
    }
}
