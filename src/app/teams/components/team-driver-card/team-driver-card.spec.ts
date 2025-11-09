import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamDriverCard } from './team-driver-card';

describe('TeamDriverCard', () => {
  let component: TeamDriverCard;
  let fixture: ComponentFixture<TeamDriverCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeamDriverCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamDriverCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
