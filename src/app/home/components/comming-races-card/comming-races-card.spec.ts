import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommingRacesCard } from './comming-races-card';

describe('CommingRacesCard', () => {
  let component: CommingRacesCard;
  let fixture: ComponentFixture<CommingRacesCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommingRacesCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommingRacesCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
