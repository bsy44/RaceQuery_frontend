import { Component, inject, OnInit } from '@angular/core';
import { DriverService } from '../../services/driver.service';
import { DriverModel } from '../../models/driver.model';
import { PageHeader } from '../../../shared/components/page-header/page-header';
import { DriverCard } from '../driver-card/driver-card';
import { RouterLink } from '@angular/router';
import {Loading} from '../../../shared/components/loading/loading';

@Component({
  selector: 'app-driver',
  imports: [
    PageHeader,
    DriverCard,
    RouterLink,
    Loading,
  ],
  templateUrl: './driver.html',
  styleUrls: ['./driver.css'],
  standalone: true
})
export class Driver implements OnInit {
  private driverService = inject(DriverService);

  drivers: DriverModel[] = [];
  isLoading = true;

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      this.load();
    }
  }


  load(){
    this.isLoading = true;

    this.driverService.getAllDrivers().subscribe({
      next: (data) => {
        this.drivers = data;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
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
