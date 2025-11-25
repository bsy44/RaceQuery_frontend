import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverHero } from './driver-hero';

describe('DriverHero', () => {
  let component: DriverHero;
  let fixture: ComponentFixture<DriverHero>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DriverHero]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriverHero);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
