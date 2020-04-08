import { TestBed } from '@angular/core/testing';

import { AccessRequestsService } from './access-requests.service';

describe('AccessRequestsService', () => {
  let service: AccessRequestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccessRequestsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
