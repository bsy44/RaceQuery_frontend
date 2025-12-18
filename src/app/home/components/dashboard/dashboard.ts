import {Component, inject, OnInit} from '@angular/core';
import {TopStandings} from '../top-standings/top-standings';
import {StandingsService} from '../../../standings/services/standings-service';
import {DriverStandingsModel} from '../../../standings/models/driverStanding.model';
import {TeamStandingModel} from '../../../standings/models/teamStanding.model';
import {SelectorYears} from '../../../shared/components/selector-years/selector-years';
import {ComingRaces} from '../coming-races/coming-races';
import {RaceService} from '../../../races/services/race-service';
import {RaceModel} from '../../../races/models/race.model';
import {DecimalPipe} from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [
    TopStandings,
    SelectorYears,
    ComingRaces,
  ],
  templateUrl: './dashboard.html',
  standalone: true,
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {
  private readonly standingService = inject(StandingsService);
  private readonly raceService: RaceService = inject(RaceService);

  isLoading = true

  top5Drivers!: DriverStandingsModel[];
  top5Teams!: TeamStandingModel[];

  nextRace: RaceModel | null = null;
  lastRaces: RaceModel[] = [];

  ngOnInit() {
    this.load();
  }

  load(){
    this.isLoading = true;

    this.standingService.getDriverStandings().subscribe((data) => {
      this.top5Drivers = data.slice(0, 4);
      this.isLoading = false;
    });

    this.standingService.getTeamStandings().subscribe((data) => {
      this.top5Teams = data.slice(0, 4);
      this.isLoading = false;
    });

    this.raceService.getAll().subscribe((allRaces) => {
      if (!allRaces || allRaces.length === 0) {
        this.isLoading = false;
        return;
      }

      const today = new Date();
      const past = allRaces.filter(r => this.getRaceDate(r) < today);
      const future = allRaces.filter(r => this.getRaceDate(r) >= today);

      past.sort((a, b) => this.getRaceDate(b).getTime() - this.getRaceDate(a).getTime());
      future.sort((a, b) => this.getRaceDate(a).getTime() - this.getRaceDate(b).getTime());

      if (future.length > 0) {
        this.nextRace = future[0];
        this.lastRaces = past.slice(0, 3);
      } else {
        this.nextRace = null;
        this.lastRaces = past.slice(0, 4);
      }
      this.lastRaces.sort((a, b) => a.round - b.round);
      this.isLoading = false;
    });
  }

  onYearChange(year: number): void {
    this.standingService.setYear(year);
    this.raceService.setYear(year);
    this.load();
  }

  get years(): number[] {
    return this.standingService.years;
  }

  get selectedYear(): number {
    return this.standingService.selectedYear;
  }

  private getRaceDate(race: RaceModel): Date {
    if (race.sessions) {
      const raceSession = race.sessions.find((s: any) => s.name === 'Race');

      if (raceSession) {
        const dateStr = raceSession.utc_date || raceSession.local_date;
        if (dateStr) {
          return new Date(dateStr);
        }
      }
    }

    const d = new Date(race.eventDate);
    if (!isNaN(d.getTime())) {
      return d;
    }
    return new Date(0);
  }
}
