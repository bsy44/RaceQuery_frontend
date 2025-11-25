import {Component, inject, Input} from '@angular/core';
import {NAME_TO_ISO} from "../../../shared/nationalities";
import {DatePipe, NgClass} from "@angular/common";
import {DriverStats} from '../../models/driverStats.model';
import {DriverService} from '../../services/driver.service';

@Component({
  selector: 'app-driver-hero',
  imports: [
    DatePipe,
    NgClass
  ],
  templateUrl: './driver-hero.html',
  styleUrl: './driver-hero.css',
})
export class DriverHero {
  protected readonly NAME_TO_ISO = NAME_TO_ISO;
  @Input() season!: number;
  @Input() driver!: DriverStats;


  getAge(dateOfBirth: string): number {
    const birthDate = new Date(dateOfBirth);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }
}
