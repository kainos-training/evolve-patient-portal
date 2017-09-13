import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Task } from '../../class/Task';
import { User } from '../../class/User';
import { SwitchBoardService } from '../../services/switch-board.service';

@Component({
  selector: 'evolve-my-tasks',
  templateUrl: './my-tasks.component.html',
  styleUrls: ['./my-tasks.component.css']
})

export class MyTasksComponent implements OnInit{
  public tasksList: Task[];
  private user: User = new User();

  constructor(private dataService: DataService, private switchboard: SwitchBoardService) { 
    this.switchboard.user$.subscribe(usr => this.user = usr);
    this.dataService.getUserFromCookie(this.user);
  }

  ngOnInit(): void {
    if(this.user)
        if(this.user.userID)
            this.dataService.getTaskList(this.user.userID).subscribe(
                res => {this.tasksList = res;
                console.log(this.tasksList);}
            );
  }
}
