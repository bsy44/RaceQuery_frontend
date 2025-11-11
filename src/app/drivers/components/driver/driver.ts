import { Component, inject, OnInit } from '@angular/core';
import { DriverService } from '../../services/driver.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { DriverModel } from '../../models/driver.model';
import { PageHeader } from '../../../shared/components/page-header/page-header';
import { AsyncPipe } from '@angular/common';
import { DriverCard } from '../driver-card/driver-card';

@Component({
  selector: 'app-driver',
  imports: [
    PageHeader,
    AsyncPipe,
    DriverCard,
  ],
  templateUrl: './driver.html',
  styleUrl: './driver.css',
})
export class Driver implements OnInit {
  private driverService = inject(DriverService);

  drivers: Observable<DriverModel[]> = new BehaviorSubject<DriverModel[]>([]);

  ngOnInit(): void {
    this.load()
  }

  load(){
    this.drivers = this.driverService.getAllDrivers()
  }

  onYearChange(year: number){
    this.driverService.setYear(year);
    this.load()
  }

  get years(): number[] {
    return this.driverService.years;
  }

  get selectedYear(): number {
    return this.driverService.selectedYear;
  }
}
