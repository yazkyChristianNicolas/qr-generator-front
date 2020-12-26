import { TestBed } from '@angular/core/testing';

import { CodeApiService } from './code-api.service';

describe('CodeApiService', () => {
  let service: CodeApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CodeApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
