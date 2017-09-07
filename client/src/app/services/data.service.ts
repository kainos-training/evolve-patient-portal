import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from './../user';
import * as $ from 'jquery';
import {CookieService} from 'ngx-cookie-service';
import {SwitchBoardService} from './switch-board.service';
import {Router} from '@angular/router';

@Injectable()
export class DataService {

    private cookieName = 'evolve-cookie';
    private urlCookie = 'redirect';
    public evolveLogoPath = 'assets/EvolveLogo.svg';

    constructor(private http: HttpClient, private cookieService: CookieService, private switchBoard: SwitchBoardService, private router: Router) { }

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
                // redirecting to the previous url
                this.router.navigateByUrl(this.getRedirectCookie());
                // removing the redirect from storage
                this.removeRedirectCookie();
            }, error => {
                user = this.mapErrorToUser(user, error);
            });
    }

    public mapDataToUser(user, data): User{
        if(data){
            if(data['userID'] && data['token'] && data['message'] ){
                user.userID = data['userID'];
                user.token = data['token'];
                user.loggedIn = true;
                user.message = data['message'];
            }
        }

        return user;
    }

    public mapErrorToUser(user, error): User{
        if(error){
            if(error['message']){
                user.message = error["message"];
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

    public saveRedirectCookie(url): void{
        this.cookieService.set(this.urlCookie, url);
    }

    public getRedirectCookie(): string{
        return this.cookieService.get(this.urlCookie);
    }

    public removeRedirectCookie(): void {
        this.cookieService.delete(this.urlCookie);
    }
}
