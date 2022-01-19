import { TestBed } from '@angular/core/testing';

import { LocalInterfaceService } from './local-interface.service';

describe('LocalInterfaceService', () => {
  let service: LocalInterfaceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalInterfaceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
