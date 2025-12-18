import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StandingsItem } from './standings-item';

describe('StandingsItem', () => {
  let component: StandingsItem;
  let fixture: ComponentFixture<StandingsItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StandingsItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StandingsItem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
