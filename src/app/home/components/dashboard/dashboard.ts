import {Component, inject, OnInit} from '@angular/core';
import {TopStandings} from '../top-standings/top-standings';
import {StandingsService} from '../../../standings/services/standings-service';
import {DriverStandingsModel} from '../../../standings/models/driverStanding.model';
import {TeamStandingModel} from '../../../standings/models/teamStanding.model';
import {SelectorYears} from '../../../shared/components/selector-years/selector-years';

@Component({
  selector: 'app-dashboard',
  imports: [
    TopStandings,
    SelectorYears
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {
  private readonly standingService = inject(StandingsService)
  top5Drivers!: DriverStandingsModel[];
  top5Teams!: TeamStandingModel[];

  ngOnInit() {
    this.load();
  }

  load(){
    this.standingService.getDriverStandings().subscribe((data) => {
      this.top5Drivers = data.slice(0, 3);
    });

    this.standingService.getTeamStandings().subscribe((data) => {
      this.top5Teams = data.slice(0, 3);
    });
  }

  onYearChange(year: number): void {
    this.standingService.setYear(year);
    this.load();
  }

  get years(): number[] {
    return this.standingService.years;
  }

  get selectedYear(): number {
    return this.standingService.selectedYear;
  }
}
