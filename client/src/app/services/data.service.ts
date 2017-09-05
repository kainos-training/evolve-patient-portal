import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { User } from './../user'

@Injectable()
export class DataService {

    constructor(private http: HttpClient) {
        console.log(this.http.get('/api/testQuery').subscribe());
    }

    public login(user: User): boolean {
        console.log("Logging in...")
        //call method from express server
        //For testing!
        if(user.username == "username"){
            if(user.password == "Password"){
                console.log("log in successful");
                return true;
            }
        }
        console.log("log in failed");
        return false;
    }

}
