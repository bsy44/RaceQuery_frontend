import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { DriverStandingsModel } from '../models/driverStanding.model';
import { Observable } from 'rxjs';
import {TeamStandingModel} from '../models/teamStanding.model';

@Injectable({
  providedIn: 'root'
})
export class StandingsService {
  private readonly apiURL = environment.API_URL;
  years: number [] = [];
  selectedYear: number = new Date().getFullYear();

  constructor(private http: HttpClient) {
    const currentYear = new Date().getFullYear();
    this.years = Array.from({length: currentYear - 2022 + 1}, (_, i) => 2022 + i).reverse();
  }

  getDriverStandings(): Observable<DriverStandingsModel[]> {
    return this.http.get<DriverStandingsModel[]>(`${this.apiURL}/drivers/${this.selectedYear}/standings`)
  }

  getTeamStandings(): Observable<TeamStandingModel[]> {
    return this.http.get<DriverStandingsModel[]>(`${this.apiURL}/teams/${this.selectedYear}/standings`)
  }

  setYear(year: number){
    this.selectedYear = year;
  }
}
