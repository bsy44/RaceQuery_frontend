import { Component, Input } from '@angular/core';
import { TeamDetailModel } from '../../models/teamDetail.model';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-team-stats',
  imports: [
    NgClass
  ],
  templateUrl: './team-stats.html',
  styleUrl: './team-stats.css',
})
export class TeamStats {
  @Input() team!: TeamDetailModel
}
