import { ComponentLoaderFactory, PositioningService } from 'ngx-bootstrap';
import { BsModalService } from 'ngx-bootstrap/ng2-bootstrap';
import { MenuStateService } from '../services/menu-state.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopBarComponent } from './top-bar.component';

describe('TopBarComponent', () => {
  let component: TopBarComponent;
  let fixture: ComponentFixture<TopBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopBarComponent ],
      providers: [
          MenuStateService,
          BsModalService,
          ComponentLoaderFactory,
          PositioningService
    ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('sideMenu state should be out/in depending on the window size', () => {
      var menuState = component.getMenuState();
      var menuStateToEqual = window.innerWidth >= component.getMDSCREENSIZE() ? 'out': 'in';
      expect(menuState).toEqual('out');
  });
});
