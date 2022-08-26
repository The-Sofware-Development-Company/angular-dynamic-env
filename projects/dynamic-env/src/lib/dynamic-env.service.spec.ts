import { TestBed } from '@angular/core/testing';

import { DynamicEnvService } from './dynamic-env.service';

describe('DynamicEnvService', () => {
  let service: DynamicEnvService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DynamicEnvService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
