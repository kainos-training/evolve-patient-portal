import {Component, HostListener, TemplateRef} from '@angular/core';
import {BsModalService} from 'ngx-bootstrap/modal';
import {BsModalRef} from 'ngx-bootstrap/modal/modal-options.class';
import {MenuStateService} from '../services/menu-state.service';
import {DataService} from '../services/data.service';
import { Router } from '@angular/router';

@Component({
    selector: 'evolve-top-bar',
    templateUrl: './top-bar.component.html',
    styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent {

    public modalRef: BsModalRef;
    private menuStateService: MenuStateService;
    private menuState: string;
    private readonly MDSCREENSIZE: number = 768;

    public openModal(template: TemplateRef<any>) {
        this.modalRef = this.modalService.show(template);
    }

    constructor(private data: DataService, private router: Router, private pMenuStateService: MenuStateService, private modalService: BsModalService) {
        this.menuStateService = pMenuStateService;
        this.determineMenuState();
    }

    getMenuState(): string {
        return this.menuState;
    }

    getMDSCREENSIZE(): number {
        return this.MDSCREENSIZE;
    }

    toggleMenuState() {
        this.menuState = this.menuState === 'out' ? 'in' : 'out';
        this.menuStateService.stateString(this.menuState);
    }

    private determineMenuState() {
        this.menuState = window.innerWidth >= this.MDSCREENSIZE ? 'out' : 'in';
    }

    //768
    //watch view width and reset menu state on >= md screen
    @HostListener('window:resize', ['$event'])
    resize(event) {
        this.determineMenuState();
        this.menuStateService.stateString(this.menuState);
    }

    logout() {
        this.data.removeCookie();
        this.data.removeRedirectCookie();
        this.router.navigate(['/login']);
    }
}
