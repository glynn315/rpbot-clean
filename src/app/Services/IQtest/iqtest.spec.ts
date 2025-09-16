import { TestBed } from '@angular/core/testing';

import { Iqtest } from './iqtest';

describe('Iqtest', () => {
  let service: Iqtest;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Iqtest);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
