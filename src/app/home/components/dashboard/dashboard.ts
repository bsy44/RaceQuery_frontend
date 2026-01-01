import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopStandings } from '../top-standings/top-standings';
import { StandingsService } from '../../../standings/services/standings-service';
import { DriverStandingsModel } from '../../../standings/models/driverStanding.model';
import { TeamStandingModel } from '../../../standings/models/teamStanding.model';
import { SelectorYears } from '../../../shared/components/selector-years/selector-years';
import { ComingRaces } from '../coming-races/coming-races';
import { RaceService } from '../../../races/services/race-service';
import { RaceModel } from '../../../races/models/race.model';
import { SeoService } from '../../../shared/services/seo.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  imports: [
    CommonModule,
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
  private readonly seoService = inject(SeoService);

  isLoading = true;
  top5Drivers: DriverStandingsModel[] = [];
  top5Teams: TeamStandingModel[] = [];
  nextRace: RaceModel | null = null;
  displayRaces: RaceModel[] = [];
  displayTitle: string = "";

  ngOnInit() {
    this.seoService.updateMeta(
      'Acceuil',
      'Retouver les statistiques, classements, résultats de courses et télémétries des saisons de F1.'
    );
    this.load();
  }

  load() {
    this.isLoading = true;

    forkJoin({
      drivers: this.standingService.getDriverStandings(),
      teams: this.standingService.getTeamStandings(),
      races: this.raceService.getAll()
    }).subscribe({
      next: (res) => {
        this.top5Drivers = res.drivers.slice(0, 4);
        this.top5Teams = res.teams.slice(0, 4);
        this.processRaces(res.races);
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
      }
    });
  }

  private processRaces(allRaces: RaceModel[]) {
    if (!allRaces || allRaces.length === 0) return;

    const today = new Date();
    const past = allRaces.filter(r => this.getRaceDate(r) < today);
    const future = allRaces.filter(r => this.getRaceDate(r) >= today);

    past.sort((a, b) => this.getRaceDate(b).getTime() - this.getRaceDate(a).getTime());
    future.sort((a, b) => this.getRaceDate(a).getTime() - this.getRaceDate(b).getTime());

    if (future.length > 0) {
      this.nextRace = future[0];
    } else {
      this.nextRace = past[0] || null;
    }

    if (past.length < 3) {
      this.displayTitle = "Prochaines Courses";
      this.displayRaces = future.slice(0, 4);

      if (this.displayRaces.length < 3) {
        const needed = 3 - this.displayRaces.length;
        this.displayRaces = [...this.displayRaces, ...past.slice(0, needed)];
      }
    }
    else {
      this.displayTitle = "Derniers Résultats";
      this.displayRaces = past.slice(0, 3).reverse();
    }
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
      const raceSession = race.sessions.find((s: any) =>
        s.name.toLowerCase().includes('race') || s.name === 'R'
      );

      if (raceSession) {
        const dateStr = raceSession.utc_date || raceSession.local_date;
        if (dateStr) return new Date(dateStr);
      }
    }
    const d = new Date(race.eventDate);
    return !isNaN(d.getTime()) ? d : new Date(0);
  }
}
