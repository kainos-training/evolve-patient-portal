import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from './../user';
import * as $ from 'jquery';
import {CookieService} from 'ngx-cookie-service';
import {SwitchBoardService} from './switch-board.service';

@Injectable()
export class DataService {

    private cookieName = 'evolve-cookie';

    constructor(private http: HttpClient, private cookieService: CookieService, private switchBoard: SwitchBoardService) { }

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
                // saving token, userID and message in the same user object
                user.userID = data['userID'];
                user.token = data['token'];
                user.loggedIn = true;
                user.message = data['message'];
                // creating a cookie for this user
                this.saveCookie(user.userID, user.username, user.token);
                // switching between users
                this.switchBoard.switchUser(user);
            }, error => {
                user.loggedIn = false;
                user.message = error["message"];
            });
    }

    public getUserFromCookie(user: User): void {
        const cookieValue = this.cookieService.get(this.cookieName);
        var cookieJSON;

        if (cookieValue) {
            cookieJSON = JSON.parse(cookieValue);
        }

        if (cookieJSON) {
            if (cookieJSON.userID && cookieJSON.username && cookieJSON.token) {
                user.userID = cookieJSON.userID;
                user.username = cookieJSON.username;
                user.token = cookieJSON.token;
                user.loggedIn = true;
                user.message = "Logged in from cookie data.";
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

    public removeCookie(): void{
        this.cookieService.delete(this.cookieName);
    }

    public resetPass(user: User): void {
        console.log('reaches reset method of data service');
        /*const body = {
            'username': user.username
        };
        const options = {
            headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded'),
        };

        this.http.post('/api/auth/login', $.param(body), options)
            .subscribe(data => {
                console.log(data);
                if(data.exists){
                    
                }
            }, error => {
                
            });*/
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
