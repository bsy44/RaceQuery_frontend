import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';
import { DriverStandingsModel } from '../../../standings/models/driverStanding.model';
import { TeamStandingModel } from '../../../standings/models/teamStanding.model';

type StandingItem = DriverStandingsModel | TeamStandingModel;

@Component({
  selector: 'app-top-standings',
  standalone: true,
  imports: [
    RouterLink,
    NgClass
  ],
  templateUrl: './top-standings.html',
  styleUrl: './top-standings.css'
})
export class TopStandings {
  @Input() top5: StandingItem[] = [];
  @Input() type: 'drivers' | 'teams' = 'drivers';

  isDriver(item: StandingItem): item is DriverStandingsModel {
    return this.type === 'drivers';
  }

  isTeam(item: StandingItem): item is TeamStandingModel {
    return this.type === 'teams';
  }
}
