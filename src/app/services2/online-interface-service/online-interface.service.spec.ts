import { TestBed } from '@angular/core/testing';

import { OnlineInterfaceService } from './online-interface.service';

describe('OnlineInterfaceService', () => {
  let service: OnlineInterfaceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OnlineInterfaceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
