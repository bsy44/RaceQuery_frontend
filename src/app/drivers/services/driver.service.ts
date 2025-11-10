import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DriverModel } from '../models/driver.model';
import { Observable } from 'rxjs';
import {DriverStats} from '../models/driverStats.model';

@Injectable({
  providedIn: 'root'
})
export class DriverService {
  private API_URL = "http://127.0.0.1:5000/drivers"

  constructor(private http: HttpClient) {}

  getAllDrivers(year: number): Observable<DriverModel[]> {
    return this.http.get<DriverModel[]>(`${this.API_URL}/${year}`)
  }

  getDriver(year: number, id_number: number): Observable<DriverModel> {
    return this.http.get<DriverModel>(`${this.API_URL}/${year}/${id_number}`)
  }

  getDriverStats(year: number, id_number: number): Observable<DriverStats> {
    return this.http.get<DriverStats>(`${this.API_URL}/${year}/${id_number}/detail`)
  }
}
