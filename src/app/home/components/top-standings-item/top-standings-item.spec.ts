import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopStandingsItem } from './top-standings-item';

describe('StandingsItem', () => {
  let component: TopStandingsItem;
  let fixture: ComponentFixture<TopStandingsItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopStandingsItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopStandingsItem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
