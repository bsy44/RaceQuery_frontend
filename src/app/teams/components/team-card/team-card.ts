import { Component, Input } from '@angular/core';
import { TEAMS_INFO } from '../../../shared/teams-info';
import { TeamModel } from '../../models/team.model';

@Component({
  selector: 'app-team-card',
  imports: [],
  templateUrl: './team-card.html',
  styleUrl: './team-card.css',
})
export class TeamCard {
  protected readonly TEAMS_INFO = TEAMS_INFO;
  @Input() team!: TeamModel;

}
