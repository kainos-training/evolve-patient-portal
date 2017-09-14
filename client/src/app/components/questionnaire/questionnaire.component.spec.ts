import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { QuestionnaireComponent } from './questionnaire.component';
import { TaskQuestionnaire } from '../../class/TaskQuestionnaire';
import { ModalModule } from 'ngx-bootstrap';
import { RouterTestingModule } from '@angular/router/testing';
import { DataService } from '../../services/data.service';
import {HttpClient} from '@angular/common/http';
import { HttpHandler } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { SwitchBoardService } from '../../services/switch-board.service';
import { inject } from '@angular/core/testing';

export class MockDataService {

  taskAnswer: Array<TaskQuestionnaire> = [];
  addQuestionnaireAnswer(taskID: number, answer: String) {
      if (typeof (answer) === 'string' && answer != '') {
          this.taskAnswer.push(new TaskQuestionnaire(1, '{"test","test2"}'));
          this.taskAnswer.push(new TaskQuestionnaire(taskID, answer));
          return this.taskAnswer;
      }

      else throw new Error('Please enter a comment');
  }

  getTaskAnswers(userID: number) {
    if (userID == 1) {
        return this.taskAnswer;
    }
    return Array<TaskQuestionnaire>();
}
}

describe('QuestionnaireComponent', () => {
  let component: QuestionnaireComponent;
  let fixture: ComponentFixture<QuestionnaireComponent>;
  let mockDataService: MockDataService;
  
  beforeEach(async(() => {
    mockDataService = new MockDataService();
    
    TestBed.configureTestingModule({
      declarations: [ QuestionnaireComponent ],
      providers: [DataService, HttpClient, HttpHandler, CookieService, SwitchBoardService],
      imports:[
        ModalModule.forRoot(),
        RouterTestingModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();

    TestBed.overrideComponent(QuestionnaireComponent, {
      set: {
          providers: [
              {provide: DataService, useClass: MockDataService}
          ]
      }
  });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionnaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should add a new comment to the comment list. [UserID: 1][Answer: {"run test", "test run"}]', () => {
    let mockDataService: MockDataService = new MockDataService();
    mockDataService.addQuestionnaireAnswer(1, '{"run test", "test run"}');
    let serviceResultSize = mockDataService.getTaskAnswers(1).length;

    expect(serviceResultSize).toBe(2);
});
});
