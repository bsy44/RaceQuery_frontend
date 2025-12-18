import { Component, inject, OnInit } from '@angular/core';
import { DriverService } from '../../services/driver.service';
import { ActivatedRoute } from '@angular/router';
import { DriverStats } from '../../models/driverStats.model';
import { NgClass } from '@angular/common';
import { NAME_TO_ISO } from '../../../shared/nationalities';
import { SeasonResult } from '../../models/season-result.model';
import { RaceTableResult } from '../race-table-result/race-table-result';
import { DriverHero } from '../driver-hero/driver-hero';
import {StatsSection} from '../../../shared/components/stats-section/stats-section';
import {ScrollTop} from '../../../shared/components/scroll-top/scroll-top';

@Component({
  selector: 'app-driver-standing-detail',
  imports: [
    NgClass,
    RaceTableResult,
    DriverHero,
    StatsSection
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

    this.driverService.getSeasonResult(this.season, this.driverId).subscribe((data) => {
      this.seasonResult = data;
    })
  }

}
