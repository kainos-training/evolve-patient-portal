import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {User} from '../class/user';
import {DataService} from '../services/data.service';
import {Subscription} from 'rxjs/Subscription';
import {SwitchBoardService} from '../services/switch-board.service';

@Injectable()
export class RouteGuard implements CanActivate {

    user: User;
    userSubscription: Subscription;

    constructor(private data: DataService, private switchBoard: SwitchBoardService, private router: Router){
        this.user = new User();
        this.user.loggedIn = false;

        this.userSubscription = this.switchBoard.user$.subscribe((u) => {
            this.user = u;
        });
    }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ) {
        this.data.saveRedirectCookie(state.url);
        this.data.getUserFromCookie(this.user);

        if (this.user.loggedIn) {
            return true;
        } else {
            const url = "/forbidden";
            this.router.navigateByUrl(url);
            return false;
        }
    }
}
