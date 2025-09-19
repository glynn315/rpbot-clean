import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Interviewevaluation } from './interviewevaluation';

describe('Interviewevaluation', () => {
  let component: Interviewevaluation;
  let fixture: ComponentFixture<Interviewevaluation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Interviewevaluation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Interviewevaluation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
