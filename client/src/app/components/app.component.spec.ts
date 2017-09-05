import { TestBed, async } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { AlertModule } from "ngx-bootstrap";

import { HttpClient } from "@angular/common/http";
import { HttpClientModule } from "@angular/common/http";

describe('AppComponent', () => {
  beforeEach(async(() => {
    
    TestBed.configureTestingModule({
        declarations: [
            AppComponent
          ],
          imports: [
            AlertModule.forRoot(),
            HttpClientModule,
          ]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'Evolve patient portal'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Evolve patient portal');
  }));

  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to Evolve patient portal!');
  }));
});
