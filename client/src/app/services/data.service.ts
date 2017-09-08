import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Medication } from '../Medication';
import { Observable } from 'rxjs/Observable';
import { MedicationComment } from '../MedicationComment';
import { MedicationDescription } from '../MedicationDescription';
import { User } from '../class/user';
import * as $ from 'jquery';
import { CookieService } from 'ngx-cookie-service';
import { SwitchBoardService } from './switch-board.service';
import { Router } from '@angular/router';
import {Appointment} from '../class/appointment';
import {AppointmentFurtherInfo} from '../class/appointmentFurtherInfo';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class DataService {
    private cookieName = 'evolve-cookie';
    private urlCookie = 'redirect';
    public evolveLogoPath = 'assets/EvolveLogo.svg';
    public dashboardURL = '/dashboard';

    constructor(private http: HttpClient, private cookieService: CookieService, private switchBoard: SwitchBoardService, private router: Router) {
    }

    public getMedicationList(userID) {
        const body = {
            "userID": userID
        };
        const options = {
            headers: new HttpHeaders().set('Content-Type', 'application/json'),
        };

        return this.http.post<Medication[]>('api/medication/list', body, options);
    };

    public getMedicationComments(medicationUserID) {
        const body = {
            "medicationUserID": medicationUserID
        };
        const options = {
            headers: new HttpHeaders().set('Content-Type', 'application/json'),
        };

        return this.http.post<MedicationComment[]>('api/medication/comments/list', body, options);
    }

    public getMedicationHistory(medicationID, userID) {
        const body = {
            "medicationID": medicationID,
            "userID": userID
        };
        const options = {
            headers: new HttpHeaders().set('Content-Type', 'application/json'),
        };

        return this.http.post<Medication[]>('api/medication/history', body, options);
    }

    public removeMedicationComment(medicationUserCommentID) {
        const body = {
            "medicationUserCommentID": medicationUserCommentID
        };
        const options = {
            headers: new HttpHeaders().set('Content-Type', 'application/json'),
        };
        this.http.post('api/medication/comments/remove', body, options).subscribe();
    }

    public addMedicationComment(medicationUserID, commentText) {
        const body = {
            "medicationUserID": medicationUserID,
            "commentText": commentText
        };
        const options = {
            headers: new HttpHeaders().set('Content-Type', 'application/json'),
        };
        this.http.post('api/medication/comments/add', body, options).subscribe();
    }

    public getWikiSummary(medName) {
        const body = {
            "medicationName": medName
        };
        const options = {
            headers: new HttpHeaders().set('Content-Type', 'application/json')
        };

        return this.http.post<MedicationDescription>('api/medication/wiki/desc', body, options);
    }
    
    public login(user: User): void {
        const body = {
            'username': user.username,
            'password': user.password
        };
        const options = {
            headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded'),
        };

        this.http.post('/api/auth/login', $.param(body), options)
            .subscribe(data => {
                user = this.mapDataToUser(user, data);
                // creating a cookie for this user
                this.saveCookie(user.userID, user.username, user.token);
                // switching between users
                this.switchBoard.switchUser(user);
                // redirecting to the previous url or to dashboard as homepage
                if(this.getRedirectCookie() !== ""){
                    this.router.navigateByUrl(this.getRedirectCookie());
                }else{
                    this.router.navigateByUrl(this.dashboardURL);
                }
                // removing the redirect from storage
                this.removeRedirectCookie();
                // redirect to dashboard

            }, error => {
                user = this.mapErrorToUser(user, error);
            });
    }

    public getUser(userID: string): Observable<Object> {
        const body = {
            'userID': userID
        };
        const options = {
            headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded'),
        };

        return this.http.post('/api/password/getUser', $.param(body), options);
    }

    public mapDataToUser(user, data): User {
        if (data) {
            if (data['userID'] && data['token'] && data['message']) {
                user.userID = data['userID'];
                user.token = data['token'];
                user.loggedIn = true;
                user.message = data['message'];
            }
        }

        return user;
    }

    public mapErrorToUser(user, error): User {
        if (error) {
            if (error['message']) {
                user.message = error['message'];
            }
        }

        return user;
    }

    public getUserFromCookie(user: User): void {
        const cookieValue = this.cookieService.get(this.cookieName);
        var cookieJSON;
        user.loggedIn = false;

        if(cookieValue) {
            cookieJSON = JSON.parse(cookieValue);
        }

        if (cookieJSON) {
            if (cookieJSON.userID && cookieJSON.username && cookieJSON.token) {
                user.userID = cookieJSON.userID;
                user.username = cookieJSON.username;
                user.token = cookieJSON.token;
                user.loggedIn = true;
                user.message = 'Logged in from cookie data.';
            }
        }

        this.switchBoard.switchUser(user);
    }

    public saveCookie(userID, username, token): void {
        if(userID && username && token) {
            const cookieJSON = {
                userID: userID,
                username: username,
                token: token
            };
            this.cookieService.set(this.cookieName, JSON.stringify(cookieJSON));
        }
    }

    public removeCookie(): void {
        this.cookieService.delete(this.cookieName);
    }

    public saveRedirectCookie(url): void {
        this.cookieService.set(this.urlCookie, url);
    }

    public getRedirectCookie(): string {
        return this.cookieService.get(this.urlCookie);
    }

    public removeRedirectCookie(): void {
        this.cookieService.delete(this.urlCookie);
    }

    public getAllAppointmentsByUserID(userID) {
        let headers = new Headers({'Content-Type': 'application/json'});
        const body = {
            'userID': userID
        };
        const options = {
            headers: new HttpHeaders().set('Content-Type', 'application/json'),
        };
        let url = '/api/appointment/getAllAppointmentsByUserID';
        return this.http.post<Appointment[]>(url, body, options);
    };

    public getAppointmentInformation(appointmentID) {
        let headers = new Headers({'Content-Type': 'application/json'});
        const body = {
            'appointmentID': appointmentID
        };
        const options = {
            headers: new HttpHeaders().set('Content-Type', 'application/json'),
        };
        let url = '/api/appointment/getAppointmentFurtherInfo';
        return this.http.post<AppointmentFurtherInfo>(url, body, options);
    }

    public getUserInfoByUserID(userID) {
        let headers = new Headers({'Content-Type': 'application/json'});
        const body = {
            'userID': userID
        };
        const options = {
            headers: new HttpHeaders().set('Content-Type', 'application/json'),
        };
        let url = '/api/userInfo/getUserInfoByUserID';
        return this.http.post<User>(url, body, options);
    }

    public requestResetPassword(user: User, router: Router): void {
        console.log('reaches reset method of data service');
        const body = {
            'username': user.username
        };
        const options = {
            headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded'),
        };

        this.http.post('/api/password/user', $.param(body), options)
            .subscribe(data => {
                this.switchBoard.updateValid(true);
                this.switchBoard.updateSuccessful(true);
                //user.userID = data['userID'];
                //router.navigate(['/reset', user.userID]);
            }, error => {
                this.switchBoard.updateValid(false);
                this.switchBoard.updateSuccessful(false);
            });
    }

    public resetPassword(user: User): void {
        const body = {
            'userID': user.userID,
            'password': user.password
        };
        const options = {
            headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded'),
        };

        this.http.post('/api/password/reset', $.param(body), options)
            .subscribe(data => {
                // saving token, userID and message in the same user object
                user.userID = data['userID'];
                user.message = data['message'];
            }, error => {
                user.loggedIn = false;
                user.message = error["message"];
            });
    }


}
