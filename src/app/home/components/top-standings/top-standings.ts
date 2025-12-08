import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import {NgClass} from '@angular/common';
import {DriverStandingsModel} from '../../../standings/models/driverStanding.model';
import {TeamStandingModel} from '../../../standings/models/teamStanding.model';

@Component({
  selector: 'app-top-standings',
  imports: [
    RouterLink,
    NgClass
  ],
  templateUrl: './top-standings.html',
  styleUrl: './top-standings.css',
})
export class TopStandings {
  @Input() top5: (DriverStandingsModel | TeamStandingModel)[] = [];
  @Input() type: 'drivers' | 'teams' = 'drivers';

  isDriver(item: any): item is DriverStandingsModel {
    return this.type === 'drivers';
  }

  isTeam(item: any): item is TeamStandingModel {
    return this.type === 'teams';
  }
}
