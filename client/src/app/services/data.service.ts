import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Medication } from '../class/Medication';
import { Task } from '../class/Task';
import { Observable } from 'rxjs/Observable';
import { MedicationComment } from '../class/MedicationComment';
import { MedicationDescription } from '../class/MedicationDescription';
import * as $ from 'jquery';
import { CookieService } from 'ngx-cookie-service';
import { SwitchBoardService } from './switch-board.service';
import { Router } from '@angular/router';
import { Appointment } from '../class/Appointment';
import { AppointmentFurtherInfo } from '../class/AppointmentFurtherInfo';
import { User } from '../class/User';
import { TimelineAppointment } from "../class/TimelineAppointment";
import { SideEffect } from '../class/SideEffect';
import { Condition } from '../class/Condition';
import { Clinician } from '../class/Clinician';
import { Pharmacy } from '../class/Pharmacy';
import { AppointmentCount } from '../class/AppointmentCount';
import { SearchPharmacyComponent } from '../components/search-pharmacy/search-pharmacy.component';
import { GP } from '../class/GP';
import { GPPractice } from '../class/GPPractice';
@Injectable()
export class DataService {
    private cookieName = 'evolve-cookie';
    private urlCookie = 'redirect';
    public evolveLogoPath = 'assets/EvolveLogo.svg';
    public dashboardURL = '/dashboard';

    constructor(private http: HttpClient, private cookieService: CookieService, private switchBoard: SwitchBoardService, private router: Router) {
    }

    public getTimelineAppointments(userID,intervalBefore,intervalAfter){
        const body = {
            'userID' : userID,
            'intervalBefore' : intervalBefore,
            'intervalAfter' : intervalAfter
        };
        const options = {
            headers: new HttpHeaders().set('Content-Type', 'application/json'),
        };

        return this.http.post<TimelineAppointment[]>('api/timeline/getTimelineAppointments', body, options);
    }

    public countTimelineAppointmentFuture(appCount, userID){
        const body = {
            'appCount':appCount,
            'userID':userID
             };
        const options = {
            headers: new HttpHeaders().set('Content-Type', 'application/json'),
        };
        return this.http.post<AppointmentCount>('api/timeline/countTimelineAppointmentsFuture', body, options);
    }    

    public countTimelineAppointmentPrevious(appCount,userID){
        const body = {
            'appCount':appCount,
            'userID':userID
             };
        const options = {
            headers: new HttpHeaders().set('Content-Type', 'application/json'),
        };

        return this.http.post<AppointmentCount>('api/timeline/countTimelineAppointmentsPrevious', body, options);
    } 

    public getMedicationList(userID) {
        const body = {
            'userID': userID
        };
        const options = {
            headers: new HttpHeaders().set('Content-Type', 'application/json'),
        };
        return this.http.post<Medication[]>('api/medication/list', body, options);
    };

    public getRepeatedMedication(userID) {
        const body = {
            'userID': userID
        };
        const options = {
            headers: new HttpHeaders().set('Content-Type', 'application/json'),
        };
        return this.http.post<Medication[]>('api/prescription/repeatedMedication', body, options);
    };

    public updatePrescriptionDate(medicationUserIDs: number[], deliveryStatus: boolean, medicationIDs: number[]) {
        const body = {
            medicationUserIDs: '',
            deliveryStatus: deliveryStatus,
            collectionAddress: SearchPharmacyComponent.currentlySelectedLocation,
            medicationID: medicationIDs
        };
        console.log(body.deliveryStatus);
            body.medicationUserIDs = '(';
        for (var i = 0; i < medicationUserIDs.length; i++) {
            body.medicationUserIDs += medicationUserIDs[i] + ',';
        }
        body.medicationUserIDs = body.medicationUserIDs.substring(0, body.medicationUserIDs.length - 1)+')';
        
        const options = {
            headers: new HttpHeaders().set('Content-Type', 'application/json'),
        };
        console.log(body);
        return this.http.post('api/prescription/updatePrescribedDate', body, options).subscribe();
    };

    public getLocalPharmacy(userID) {
        const body = {
            'userID': userID
        };
        const options = {
            headers: new HttpHeaders().set('Content-Type', 'application/json'),
        };
        return this.http.post<Pharmacy[]>('api/prescription/pharmacy', body, options);
    };



    public getTaskList(userID) {
        const body = {
            "userID": userID
        };
        const options = {
            headers: new HttpHeaders().set('Content-Type', 'application/json'),
        };
         var tmp = this.http.post<Task[]>('api/task/list', body, options);
         var str;
         tmp.subscribe(blah => str = blah[0].taskName);
         return tmp;
    };

    public getUserSideEffects(userID) {
        const body = {
            'userID': userID
        };
        const options = {
            headers: new HttpHeaders().set('Content-Type', 'application/json'),
        };
        return this.http.post<SideEffect[]>('api/medication/side-effects', body, options);
    };

    public getMedicationComments(medicationUserID) {
        const body = {
            'medicationUserID': medicationUserID
        };
        const options = {
            headers: new HttpHeaders().set('Content-Type', 'application/json'),
        };

        return this.http.post<MedicationComment[]>('api/medication/comments/list', body, options);
    }

    public getRemovedMedicationComments(medicationUserID) {
        const body = {
            "medicationUserID": medicationUserID
        };
        const options = {
            headers: new HttpHeaders().set('Content-Type', 'application/json'),
        };

        return this.http.post<MedicationComment[]>('api/medication/comments/removedList', body, options);
    }

    public getMedicationHistory(medicationID, userID) {
        const body = {
            'medicationID': medicationID,
            'userID': userID
        };
        const options = {
            headers: new HttpHeaders().set('Content-Type', 'application/json'),
        };

        return this.http.post<Medication[]>('api/medication/history', body, options);
    }

    public removeMedicationComment(medicationUserCommentID) {
        const body = {
            'medicationUserCommentID': medicationUserCommentID
        };
        const options = {
            headers: new HttpHeaders().set('Content-Type', 'application/json'),
        };
        this.http.post('api/medication/comments/remove', body, options).subscribe();
    }

    public removeUserSideEffect(userSideEffectID) {
        const body = {
            'userSideEffectID': userSideEffectID
        };
        const options = {
            headers: new HttpHeaders().set('Content-Type', 'application/json'),
        };
        this.http.post('api/medication/side-effects/remove', body, options).subscribe();
    }

    public addMedicationComment(medicationUserID, commentText) {
        const body = {
            'medicationUserID': medicationUserID,
            'commentText': commentText
        };
        const options = {
            headers: new HttpHeaders().set('Content-Type', 'application/json'),
        };
        this.http.post('api/medication/comments/add', body, options).subscribe();
    }

    public addUserSideEffect(userID, commentText){
        const body = {
            'userID': userID,
            'commentText': commentText
        };
        const options = {
            headers: new HttpHeaders().set('Content-Type', 'application/json'),
        };
        this.http.post('api/medication/side-effects/add', body, options).subscribe();
    }

    public addQuestionnaireAnswer(taskID, answer) {
        const body = {
            'taskID': taskID,
            'answer': JSON.stringify(answer)
        }
        const options = {
            headers: new HttpHeaders().set('Content-Type', 'application/json'),
        };
        this.http.post('api/task/answer', body, options).subscribe();
    }

    public getWikiSummary(medName) {
        const body = {
            'medicationName': medName
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
                this.saveCookie(user.userID, user.username, user.token);
                this.switchBoard.switchUser(user);
                if (this.getRedirectCookie() !== '') {
                    this.router.navigateByUrl(this.getRedirectCookie());
                } else {
                    this.router.navigateByUrl(this.dashboardURL);
                }
                this.removeRedirectCookie();
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

        if (cookieValue) {
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
        if (userID && username && token) {
            const cookieJSON = {
                userID: userID,
                username: username,
                token: token
            };
            this.cookieService.set(this.cookieName, JSON.stringify(cookieJSON));
        }
    }

    public getCookie(): string {
        const cookieJSON = JSON.parse(this.cookieService.get(this.cookieName));
        var userID = cookieJSON.userID;
        return userID;
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

    public getPreviousAppointments(userID) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        const body = {
            'userID': userID
        };
        const options = {
            headers: new HttpHeaders().set('Content-Type', 'application/json'),
        };
        let url = '/api/appointment/previous';
        return this.http.post<Appointment[]>(url, body, options);
    };

    public getAllAppointmentsByUserID(userID) {
        
        const body = {
            'userID': userID
        };
        const options = {
            headers: new HttpHeaders().set('Content-Type', 'application/json'),
        };
        let url = '/api/appointment/getAllAppointmentsByUserID';
        return this.http.post<Appointment[]>(url, body, options);
    };

    public getAllGPPractice(){
        let headers = new Headers({ 'Content-Type': 'application/json' });
         const body = {
            
         };
         const options = {
             headers: new HttpHeaders().set('Content-Type', 'application/json'),
         };
         let url = '/api/gp/getAllGPPractice';
         return this.http.post<GPPractice[]>(url, body, options);

    



}
public getAllGPbyPracticeID(x){
    let headers = new Headers({'Content-Type': 'application/json'});
    const body = {
        'gpPracticeID': x
    };

    const options = {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
    };
    let url = '/api/gp/getAllGPbyPracticeID';
    return this.http.post<GP[]>(url,body,options);
}
     
    public getAppointmentInformation(appointmentID) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
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
        let headers = new Headers({ 'Content-Type': 'application/json' });
        const body = {
            'userID': userID
        };
        const options = {
            headers: new HttpHeaders().set('Content-Type', 'application/json'),
        };
        let url = '/api/userInfo/getUserInfoByUserID';
        return this.http.post<User[]>(url, body, options);
    }

    public getAllUserDependants(userID){
        let headers = new Headers({ 'Content-Type': 'application/json' });
        const body = {
            'userID': userID
        };
        const options = {
            headers: new HttpHeaders().set('Content-Type', 'application/json'),
        };
        let url = '/api/dependants/getAllDependants';
        return this.http.post<User[]>(url, body, options);
    }

    public getCurrentConditions(userID) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        const body = {
            'userID': userID
        };
        const options = {
            headers: new HttpHeaders().set('Content-Type', 'application/json'),
        };
        let url = '/api/condition/current';
        return this.http.post<Condition[]>(url, body, options);
    }

    public getPreviousConditions(userID) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        const body = {
            'userID': userID
        };
        const options = {
            headers: new HttpHeaders().set('Content-Type', 'application/json'),
        };
        let url = '/api/condition/previous';
        return this.http.post<Condition[]>(url, body, options);
    }

    public getUserClinicians(userID) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        const body = {
            'userID': userID
        };
        const options = {
            headers: new HttpHeaders().set('Content-Type', 'application/json'),
        };
        let url = '/api/appointment/getUserClinicians';
        return this.http.post<Clinician[]>(url, body, options);
    }

    public addAppointmentQuery(appointmentID, clinicianID, querySubject, queryText) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        const body = {
            'appointmentID': appointmentID,
            'clinicianID': clinicianID,
            'querySubject': querySubject,
            'queryText': queryText
        };
        const options = {
            headers: new HttpHeaders().set('Content-Type', 'application/json'),
        };
        let url = '/api/appointment/addAppointmentQuery';
        this.http.post(url, body, options).subscribe();
    }

    public requestResetPassword(user: User, router: Router): void {
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
    }

    public updateUserDetails(newUserDetails: any){
        return new Promise((resolve, reject)=>{
            const body = {
                "email": newUserDetails.email,
                "preferredName": newUserDetails.preferredName,
                "address": newUserDetails.address,
                "mobilePhoneNumber": newUserDetails.mobilePhoneNumber,
                "homePhoneNumber": newUserDetails.homePhoneNumber,
                "workPhoneNumber": newUserDetails.workPhoneNumber,
                "userID": newUserDetails.userID
            };
            const options = {
                headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded'),
            };
            this.http.post('/api/user/updateUserDetails', $.param(body), options)
            .subscribe(data => {
                resolve(data);
            }, error => {
                reject(error);
            });
        });
    }

    

    logout() {
        this.removeCookie();
        this.removeRedirectCookie();
        this.router.navigate(['/login']);
    }
}