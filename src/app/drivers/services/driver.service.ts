import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DriverModel } from '../models/driver.model';
import { Observable } from 'rxjs';
import { DriverStats } from '../models/driverStats.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DriverService {
  private API_URL = environment.API_URL
  selectedYear: number = new Date().getFullYear();
  years: number[] = [];

  constructor(private http: HttpClient) {
    const currentYear = new Date().getFullYear();
    this.years = Array.from(
      {
        length: currentYear - 2022 + 1
      }, (_, i) => 2022 + i).reverse();
  }

  getAllDrivers(): Observable<DriverModel[]> {
    return this.http.get<DriverModel[]>(`${this.API_URL}/drivers/${this.selectedYear}`)
  }

  getDriver(driver_id: string): Observable<DriverModel> {
    return this.http.get<DriverModel>(`${this.API_URL}/drivers/${this.selectedYear}/${driver_id}`)
  }

  getDriverStats(driver_id: string): Observable<DriverStats> {
    return this.http.get<DriverStats>(`${this.API_URL}/drivers/${this.selectedYear}/${driver_id}/detail`)
  }

  setYear(year: number){
    this.selectedYear = year;
  }
}
