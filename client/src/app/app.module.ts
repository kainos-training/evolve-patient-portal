import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './components/app.component';
import {AlertModule} from "ngx-bootstrap";
import {DataService} from "./services/data.service";
import {HttpClientModule} from "@angular/common/http";
import { RequestPasswordResetComponent } from './request-password-reset/request-password-reset.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    RequestPasswordResetComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AlertModule.forRoot()
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
