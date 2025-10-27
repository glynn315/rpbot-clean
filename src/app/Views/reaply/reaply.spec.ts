import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Reaply } from './reaply';

describe('Reaply', () => {
  let component: Reaply;
  let fixture: ComponentFixture<Reaply>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Reaply]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Reaply);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
