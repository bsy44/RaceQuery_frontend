import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DriverStandingsModel } from '../../../standings/models/driverStanding.model';
import { TeamStandingModel } from '../../../standings/models/teamStanding.model';
import { TopStandingsItem } from '../top-standings-item/top-standings-item';
import {Card} from '../../shared/card/card';

type StandingItem = DriverStandingsModel | TeamStandingModel;

@Component({
  selector: 'app-top-standings',
  standalone: true,
  imports: [
    RouterLink,
    TopStandingsItem,
    Card
  ],
  templateUrl: './top-standings.html',
  styleUrl: './top-standings.css'
})
export class TopStandings {
  @Input() top5: StandingItem[] = [];
  @Input() type: 'drivers' | 'teams' = 'drivers';
  @Input() isLoading: boolean = false;
}
