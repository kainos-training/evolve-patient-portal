import { Component, TemplateRef, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Medication } from '../../class/Medication';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { Observable } from 'rxjs/Observable';
import { MedicationComment } from '../../class/MedicationComment';
import { MedicationDescription } from '../../class/MedicationDescription';
import { SideEffect } from '../../class/SideEffect';
import { Sanitizer } from '@angular/core';
import { SecurityContext } from '@angular/core';
import {AccordionModule} from 'ngx-bootstrap/accordion';
import { User } from '../../class/User';
import { SwitchBoardService } from '../../services/switch-board.service';
import { Subscription } from 'rxjs/Rx';
@Component({
  selector: 'evolve-side-effects',
  templateUrl: './side-effects.component.html',
  styleUrls: ['./side-effects.component.css']
})

export class SideEffectsComponent implements OnInit {
  public userSideEffects: SideEffect[];
  public newSideEffect: String;
  public showSideEffects: boolean;
  private dataService: DataService;
  private user: User = new User();

  public removeSideEffect(userSideEffectID) {
    this.dataService.removeUserSideEffect(userSideEffectID);
    this.refreshUserSideEffects();
  }

  public addSideEffect() {
    if (this.newSideEffect != null) {
        this.dataService.addUserSideEffect(this.dataService.getCookie(), this.newSideEffect);
        this.refreshUserSideEffects();
        this.newSideEffect = null;
    }
  }

  public refreshUserSideEffects() {
    this.dataService.getUserSideEffects(this.dataService.getCookie()).subscribe(
        res => this.userSideEffects = res
    );
  }

  public selectShowSideEffects() {
    this.showSideEffects = !this.showSideEffects;
  }


  constructor(dataService: DataService, private modalService: BsModalService, private switchboard: SwitchBoardService) {
      console.log("Constructor started");
    this.dataService = dataService;
    this.switchboard.user$.subscribe(usr => this.user = usr);
    this.dataService.getUserFromCookie(this.user);

    console.log("Constructor Ended");
}
  ngOnInit() {
    this.dataService.getUserSideEffects(this.user.userID).subscribe(
        res => { this.userSideEffects = res }
    );
  }
}