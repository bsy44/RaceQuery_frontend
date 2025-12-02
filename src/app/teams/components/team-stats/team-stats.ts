import { Component, Input } from '@angular/core';
import { TeamDetailModel } from '../../models/teamDetail.model';

@Component({
  selector: 'app-team-stats',
  imports: [
  ],
  templateUrl: './team-stats.html',
  styleUrl: './team-stats.css',
})
export class TeamStats {
  @Input() team!: TeamDetailModel
}
