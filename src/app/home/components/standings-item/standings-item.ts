import {Component, Input} from '@angular/core';
import { NgClass } from '@angular/common';
import { DriverStandingsModel } from '../../../standings/models/driverStanding.model';
import { TeamStandingModel } from '../../../standings/models/teamStanding.model';

type StandingItem = DriverStandingsModel | TeamStandingModel;

@Component({
  selector: 'app-standings-item',
  imports: [
    NgClass
  ],
  templateUrl: './standings-item.html',
  styleUrl: './standings-item.css',
})
export class StandingsItem {
  @Input() top5: StandingItem[] = [];
  @Input() item!: StandingItem;
  @Input() type: 'drivers' | 'teams' = 'drivers';

  isDriver(item: StandingItem): item is DriverStandingsModel {
    return this.type === 'drivers';
  }

  isTeam(item: StandingItem): item is TeamStandingModel {
    return this.type === 'teams';
  }
}
