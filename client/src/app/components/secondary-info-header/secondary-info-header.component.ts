import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { SwitchBoardService } from '../../services/switch-board.service';
import { User } from '../../class/User';
import { Subscription } from 'rxjs';
import { DataService } from '../../services/data.service';
import { SimpleChanges } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'evolve-secondary-info-header',
  templateUrl: './secondary-info-header.component.html',
  styleUrls: ['./secondary-info-header.component.css']
})
export class SecondaryInfoHeaderComponent implements OnInit, OnChanges {

    @Input() dependantID;

    userArray : User = new User();
    userSubscription: Subscription;
    private user: User = new User();

  constructor(private data : DataService, private switchboard: SwitchBoardService) { 
    this.userSubscription = this.switchboard.user$.subscribe(user => {
        this.user = user;
    });
  }

    ngOnInit() {
        this.getUserInformation();
    }

    getUserInformation() {
        this.data.getUserFromCookie(this.user);
        if(this.user) {
            // uses dependantID if available, else defaults to logged in use ID
            const id = this.dependantID || this.user.userID;

            // get the data from the component
            this.data.getUserInfoByUserID(id).subscribe(
                res => {
                    this.userArray.MRIN = res[0].MRIN;
                    this.userArray.address = res[0].address;
                    this.userArray.dateOfBirth = res[0].dateOfBirth;
                    this.userArray.email = res[0].email;
                    this.userArray.firstName = res[0].firstName;
                    this.userArray.gender = res[0].gender;
                    this.userArray.lastName = res[0].lastName;
                    this.userArray.mobilePhoneNumber = res[0].mobilePhoneNumber;
                    this.userArray.homePhoneNumber = res[0].homePhoneNumber;
                    this.userArray.workPhoneNumber = res[0].workPhoneNumber;
                    this.userArray.title = res[0].title;
                },
            );
        }
        
    }

    ngOnChanges(changes: SimpleChanges) {
        // get the new data 
        this.getUserInformation();
    }

}
