import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { TableStanding } from '../../../shared/components/table-standing/table-standing';
import { DriverStandingsModel } from '../../models/driverStanding.model';
import { PageHeader } from '../../../shared/components/page-header/page-header';

@Component({
  selector: 'app-driver',
  templateUrl: '../../pages/drivers.html',
  imports: [
    FormsModule,
    TableStanding,
    PageHeader
  ],
  styleUrls: ['./driver.css']
})
export class Driver implements OnInit {
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
