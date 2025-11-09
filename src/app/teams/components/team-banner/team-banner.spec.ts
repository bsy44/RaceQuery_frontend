import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamBanner } from './team-banner';

describe('TeamBanner', () => {
  let component: TeamBanner;
  let fixture: ComponentFixture<TeamBanner>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeamBanner]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamBanner);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
