import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondaryInfoHeaderComponent } from './secondary-info-header.component';
import { DataService } from '../../services/data.service';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { SwitchBoardService } from '../../services/switch-board.service';
import { Router } from '@angular/router';

describe('SecondaryInfoHeaderComponent', () => {
  let component: SecondaryInfoHeaderComponent;
  let fixture: ComponentFixture<SecondaryInfoHeaderComponent>;

  const mockRouter = {};
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecondaryInfoHeaderComponent ],
      providers: [
        DataService,
        CookieService,
        SwitchBoardService,
        {provide: Router, useValue: mockRouter}
      ],
      imports: [
          HttpClientModule
      ]
    })
    .compileComponents();
  }));

  it('should be created', async () => {
    fixture = TestBed.createComponent(SecondaryInfoHeaderComponent);
    component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
