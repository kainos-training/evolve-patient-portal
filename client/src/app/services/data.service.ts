import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
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

          const body = {
              username: user.username,
              password: user.password,
          };
          const options = {
            headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded'),
          };

        let res = this.http.post('/api/auth/login', body, options);

        console.log(res);

        console.log("log in failed");
        return false;
    }

}
