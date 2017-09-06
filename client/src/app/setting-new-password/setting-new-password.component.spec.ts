import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingNewPasswordComponent } from './setting-new-password.component';

describe('SettingNewPasswordComponent', () => {
  let component: SettingNewPasswordComponent;
  let fixture: ComponentFixture<SettingNewPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingNewPasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingNewPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
