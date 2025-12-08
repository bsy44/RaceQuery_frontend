import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopStandings } from './top-standings';

describe('TopStandings', () => {
  let component: TopStandings;
  let fixture: ComponentFixture<TopStandings>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopStandings]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopStandings);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
