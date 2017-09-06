import { TestBed, inject } from '@angular/core/testing';

import { SwitchBoardService } from './switch-board.service';

describe('SwitchBoardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SwitchBoardService]
    });
  });

  it('should be created', inject([SwitchBoardService], (service: SwitchBoardService) => {
    expect(service).toBeTruthy();
  }));
});
