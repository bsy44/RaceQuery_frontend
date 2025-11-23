import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaceTableResult } from './race-table-result';

describe('RaceTableResult', () => {
  let component: RaceTableResult;
  let fixture: ComponentFixture<RaceTableResult>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RaceTableResult]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RaceTableResult);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
