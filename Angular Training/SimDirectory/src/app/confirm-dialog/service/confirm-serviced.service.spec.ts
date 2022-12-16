import { TestBed } from '@angular/core/testing';

import { ConfirmServicedService } from './confirm-serviced.service';

describe('ConfirmServicedService', () => {
  let service: ConfirmServicedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfirmServicedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
