import { Component, inject, OnInit } from '@angular/core';
import { DriverService } from '../../services/driver.service';
import { ActivatedRoute } from '@angular/router';
import { DriverStats } from '../../models/driverStats.model';
import { DatePipe, NgClass } from '@angular/common';
import { NATIONALITY_TO_ISO } from '../../../shared/nationalities';
import { GoBackButton } from '../../../shared/components/go-back-button/go-back-button';

@Component({
  selector: 'app-driver-standing-detail',
  imports: [
    DatePipe,
    NgClass,
    GoBackButton
  ],
  templateUrl: './driver-detail.html',
  styleUrl: './driver-detail.css',
})
export class DriverDetail implements OnInit {
  protected readonly NATIONALITY_TO_ISO = NATIONALITY_TO_ISO;
  private driverService = inject(DriverService);
  driverId!: string;
  driver!: DriverStats;

  constructor(
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.driverId = this.route.snapshot.params['driverId'];
    this.driverService.getDriverStats(this.driverId).subscribe((data) => {
       this.driver = data
    });
  }

  getAge(dateOfBirth: string): number {
    const birthDate = new Date(dateOfBirth);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  getYear(): number{
    return this.driverService.selectedYear
  }

  onImageError(event: any) {
    event.target.src = '/drivers/default.avif';
  }
}
