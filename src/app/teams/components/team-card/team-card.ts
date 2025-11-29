import { Component, inject, Input } from '@angular/core';
import { TeamModel } from '../../models/team.model';
import { NgClass } from '@angular/common';
import { TeamService } from '../../services/team-service';

@Component({
  selector: 'app-team-card',
  imports: [
    NgClass
  ],
  templateUrl: './team-card.html',
  styleUrl: './team-card.css',
})
export class TeamCard {
  private readonly teamService = inject(TeamService);

  @Input() team!: TeamModel;


  getYear(): number {
    return this.teamService.selectedYear;
  }
}
