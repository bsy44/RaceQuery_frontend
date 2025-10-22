import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaceDetailCard } from './race-detail-card';

describe('RaceCard', () => {
  let component: RaceDetailCard;
  let fixture: ComponentFixture<RaceDetailCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RaceDetailCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RaceDetailCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
