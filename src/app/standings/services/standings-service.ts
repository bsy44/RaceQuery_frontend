import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { DriverStandingsModel } from '../models/driverStanding.model';
import { delay, Observable, of, tap } from 'rxjs';
import { TeamStandingModel } from '../models/teamStanding.model';

@Injectable({
  providedIn: 'root'
})
export class StandingsService {
  private readonly apiURL = environment.API_URL;
  private driverCache = new Map<number, DriverStandingsModel[]>();
  private teamCache = new Map<number, TeamStandingModel[]>();

  years: number [] = [];
  selectedYear: number = new Date().getFullYear();

  constructor(private http: HttpClient) {
    const currentYear = new Date().getFullYear();
    this.years = Array.from({length: currentYear - 2022 + 1}, (_, i) => 2022 + i).reverse();
  }

  getDriverStandings(): Observable<DriverStandingsModel[]> {
    const year = this.selectedYear;

    if (this.driverCache.has(year)) {
      return of(this.driverCache.get(year)!);
    }

    return this.http.get<DriverStandingsModel[]>(`${this.apiURL}/drivers/${year}/standings`).pipe(
      delay(500),
      tap(data => this.driverCache.set(year, data))
    );
  }

  getTeamStandings(): Observable<TeamStandingModel[]> {
    const year = this.selectedYear;

    if (this.teamCache.has(year)) {
      return of(this.teamCache.get(year)!);
    }

    return this.http.get<TeamStandingModel[]>(`${this.apiURL}/teams/${year}/standings`).pipe(
      delay(500),
      tap(data => this.teamCache.set(year, data))
    );
  }

  setYear(year: number){
    this.selectedYear = year;
  }
}
