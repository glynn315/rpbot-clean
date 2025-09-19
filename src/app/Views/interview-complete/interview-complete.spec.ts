import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewComplete } from './interview-complete';

describe('InterviewComplete', () => {
  let component: InterviewComplete;
  let fixture: ComponentFixture<InterviewComplete>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InterviewComplete]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InterviewComplete);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
