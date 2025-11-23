import { Component, inject, OnInit } from '@angular/core';
import { DriverService } from '../../services/driver.service';
import { ActivatedRoute } from '@angular/router';
import { DriverStats } from '../../models/driverStats.model';
import { DatePipe, NgClass } from '@angular/common';
import { NAME_TO_ISO } from '../../../shared/nationalities';
import { GoBackButton } from '../../../shared/components/go-back-button/go-back-button';
import { SeasonResult } from '../../models/season-result.model';
import { RaceTableResult } from '../race-table-result/race-table-result';
import { getIsoFromGpName } from '../../utils/driver-utils';

@Component({
  selector: 'app-driver-standing-detail',
  imports: [
    DatePipe,
    NgClass,
    GoBackButton,
    RaceTableResult
  ],
  templateUrl: './driver-detail.html',
  styleUrl: './driver-detail.css',
})
export class DriverDetail implements OnInit {
  protected readonly NAME_TO_ISO = NAME_TO_ISO;
  private driverService = inject(DriverService);
  driverId!: string;
  season!: number;
  seasonResult!: SeasonResult;
  driver!: DriverStats;

  constructor(
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.season = this.route.snapshot.params['season'];
    this.driverId = this.route.snapshot.params['driverId'];
    this.load();
  }

  load(){
    this.driverService.getDriverStats(this.season, this.driverId).subscribe((data) => {
      this.driver = data
    });

    this.driverService.getSeasonResult(this.driverId).subscribe((data) => {
      this.seasonResult = data;
    })
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
}
