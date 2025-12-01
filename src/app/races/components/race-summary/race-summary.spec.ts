import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaceSummary } from './race-summary';

describe('RaceInfo', () => {
  let component: RaceSummary;
  let fixture: ComponentFixture<RaceSummary>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RaceSummary]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RaceSummary);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
