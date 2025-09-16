import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Iqtest } from './iqtest';

describe('Iqtest', () => {
  let component: Iqtest;
  let fixture: ComponentFixture<Iqtest>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Iqtest]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Iqtest);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
