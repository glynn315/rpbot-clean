import { TestBed } from '@angular/core/testing';

import { Typing } from './typing';

describe('Typing', () => {
  let service: Typing;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Typing);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
