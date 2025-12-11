import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DriverModel } from '../models/driver.model';
import { delay, Observable, of, tap } from 'rxjs';
import { DriverStats } from '../models/driverStats.model';
import { environment } from '../../../environments/environment';
import { SeasonResult } from '../models/season-result.model';

@Injectable({
  providedIn: 'root'
})
export class DriverService {
  private API_URL = environment.API_URL
  selectedYear: number = new Date().getFullYear();
  years: number[] = [];
  private cache = new Map<number, DriverModel[]>();

  constructor(private http: HttpClient) {
    const currentYear = new Date().getFullYear();
    this.years = Array.from(
      {
        length: currentYear - 2022 + 1
      }, (_, i) => 2022 + i).reverse();
  }

  getAllDrivers(): Observable<DriverModel[]> {
    const year = this.selectedYear;

    if (this.cache.has(year)) {
      return of(this.cache.get(year)!);
    }

    return this.http.get<DriverModel[]>(`${this.API_URL}/drivers/${year}`).pipe(
      delay(500),
      tap(data => this.cache.set(year, data))
    );
  }

  getDriver(driver_id: string): Observable<DriverModel> {
    return this.http.get<DriverModel>(`${this.API_URL}/drivers/${this.selectedYear}/${driver_id}`)
  }

  getDriverStats(season:number, driver_id: string): Observable<DriverStats> {
    return this.http.get<DriverStats>(`${this.API_URL}/drivers/${season}/${driver_id}/detail`)
  }

  getSeasonResult(season: number, driver_id: string): Observable<SeasonResult> {
    return this.http.get<SeasonResult>(`${this.API_URL}/drivers/${season}/${driver_id}/season-results`)
  }

  setYear(year: number){
    this.selectedYear = year;
  }
}
