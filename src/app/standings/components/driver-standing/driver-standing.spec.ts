import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverStanding } from './driver-standing';

describe('Drivers', () => {
  let component: DriverStanding;
  let fixture: ComponentFixture<DriverStanding>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DriverStanding]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriverStanding);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
