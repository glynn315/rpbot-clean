import { TestBed } from '@angular/core/testing';

import { FormSubmission } from './form-submission';

describe('FormSubmission', () => {
  let service: FormSubmission;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormSubmission);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
