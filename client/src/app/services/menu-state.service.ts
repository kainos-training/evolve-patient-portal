import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class MenuStateService {

    private menuStateSource = new Subject<string>();
    public menuState$ = this.menuStateSource.asObservable();

    stateString(pMenuState: string) {
        this.menuStateSource.next(pMenuState);
    }
}
