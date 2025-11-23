import { Component, Input } from '@angular/core';
import { NAME_TO_ISO } from "../../../shared/nationalities";
import { NgClass } from '@angular/common';
import {DriverModel} from '../../../drivers/models/driver.model';

@Component({
  selector: 'app-team-driver-card',
  imports: [
    NgClass
  ],
  templateUrl: './team-driver-card.html',
  styleUrl: './team-driver-card.css',
})
export class TeamDriverCard {
  protected readonly NAME_TO_ISO = NAME_TO_ISO;
  @Input() driver!: DriverModel;
}
