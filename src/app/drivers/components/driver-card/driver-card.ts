import { Component, Input } from '@angular/core';
import { DriverModel } from '../../models/driver.model';
import { NAME_TO_ISO } from '../../../shared/nationalities';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-driver-card',
  imports: [
    NgClass
  ],
  templateUrl: './driver-card.html',
  styleUrl: './driver-card.css',
})
export class DriverCard {
  protected readonly NAME_TO_ISO = NAME_TO_ISO;
  @Input() driver!: DriverModel;

}
