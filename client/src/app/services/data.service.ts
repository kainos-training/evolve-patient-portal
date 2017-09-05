import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable()
export class DataService {

    constructor(private http: HttpClient) {
        //console.log(this.http.get('/api/testQuery').subscribe());
    }

}
