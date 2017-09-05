import { TestBed, inject, async } from '@angular/core/testing';
import { Injectable } from '@angular/core';

import { DataService } from './data.service';
import { HttpClient } from "@angular/common/http";
import { HttpClientModule } from "@angular/common/http";

describe('DataService', () => {
  beforeEach(async() => {
    TestBed.configureTestingModule({
      providers: [DataService],
      imports: [
        HttpClientModule,
      ]
    }).compileComponents();
  });

  it('should be created', inject([DataService], (service: DataService) => {
    expect(service).toBeTruthy();
  }));
});
