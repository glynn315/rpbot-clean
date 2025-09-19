import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewProcess } from './interview-process';

describe('InterviewProcess', () => {
  let component: InterviewProcess;
  let fixture: ComponentFixture<InterviewProcess>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InterviewProcess]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InterviewProcess);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
