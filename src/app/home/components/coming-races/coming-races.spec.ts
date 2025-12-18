import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComingRaces } from './coming-races';

describe('RaceSchedule', () => {
  let component: ComingRaces;
  let fixture: ComponentFixture<ComingRaces>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComingRaces]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComingRaces);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
