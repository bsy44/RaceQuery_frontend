import { Component, inject, OnInit } from '@angular/core';
import { DriverService } from '../../services/driver.service';
import { DriverModel } from '../../models/driver.model';
import { PageHeader } from '../../../shared/components/page-header/page-header';
import { DriverCard } from '../driver-card/driver-card';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-driver',
  imports: [
    PageHeader,
    DriverCard,
    RouterLink,
  ],
  templateUrl: './driver.html',
  styleUrls: ['./driver.css'],
  standalone: true
})
export class Driver implements OnInit {
  private driverService = inject(DriverService);

  drivers: DriverModel[] = [];

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      this.load();
    }
  }


  load(){
    this.driverService.getAllDrivers().subscribe((data) => {
      this.drivers = data;
    })
  }

  onYearChange(year: number): void {
    this.driverService.setYear(year);
    this.load();
  }

  get years(): number[] {
    return this.driverService.years;
  }

  get selectedYear(): number {
    return this.driverService.selectedYear;
  }
}
