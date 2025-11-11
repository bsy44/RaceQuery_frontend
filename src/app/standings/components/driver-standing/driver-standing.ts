import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { TableStanding } from '../table-standing/table-standing';
import { PageHeader } from '../../../shared/components/page-header/page-header';
import {DriverStandingsModel} from '../../models/driverStanding.model';

@Component({
  selector: 'app-driver-standing',
  templateUrl: './driver-standing.html',
  imports: [
    FormsModule,
    TableStanding,
    PageHeader
  ],
  styleUrls: ['./driver-standing.css']
})
export class DriverStanding implements OnInit {
  driverList: DriverStandingsModel[] = [];
  years: number[] = [];
  selectedYear: number = new Date().getFullYear();

  constructor(private http: HttpClient) {}

  ngOnInit() {
    const currentYear = new Date().getFullYear();
    this.years = Array.from({
      length: currentYear - 2022 + 1
    }, (_, i) => 2022 + i).reverse();
    this.getDrivers();
  }

  columns = ['Pos.', 'Pilote', 'Écurie', 'Points', 'Évo.'];

  getDrivers() {
    this.http
      .get<DriverStandingsModel[]>(`http://127.0.0.1:5000/drivers/standings/${this.selectedYear}`)
      .subscribe((result) => {
        this.driverList = result
      });
  }
}
