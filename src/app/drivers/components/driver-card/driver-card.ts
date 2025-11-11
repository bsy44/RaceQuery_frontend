import {Component, Input} from '@angular/core';
import {DriverModel} from '../../models/driver.model';
import {NATIONALITY_TO_ISO} from '../../../shared/nationalities';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-driver-card',
  imports: [
    NgClass
  ],
  templateUrl: './driver-card.html',
  styleUrl: './driver-card.css',
})
export class DriverCard {
  @Input() driver!: DriverModel;

  protected readonly NATIONALITY_TO_ISO = NATIONALITY_TO_ISO;
}
