import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaceSchedule } from './race-schedule';

describe('RaceSchedule', () => {
  let component: RaceSchedule;
  let fixture: ComponentFixture<RaceSchedule>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RaceSchedule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RaceSchedule);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
