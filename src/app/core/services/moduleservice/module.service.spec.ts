import { TestBed } from '@angular/core/testing';

import { ModuleserviceService } from './moduleservice.service';

describe('ModuleserviceService', () => {
  let service: ModuleserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModuleserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});