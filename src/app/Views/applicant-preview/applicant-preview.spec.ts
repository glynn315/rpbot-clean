import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantPreview } from './applicant-preview';

describe('ApplicantPreview', () => {
  let component: ApplicantPreview;
  let fixture: ComponentFixture<ApplicantPreview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApplicantPreview]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplicantPreview);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
