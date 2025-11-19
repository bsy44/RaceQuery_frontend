import {Component, inject, Input, OnInit} from '@angular/core';
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
export class TeamCard implements OnInit {
  team!: TeamModel;
  private readonly teamService = inject(TeamService)
  @Input()idTeam!: string;


  ngOnInit() {
    this.teamService.getTeam(this.idTeam).subscribe((result) => {
      this.team = result
    });
  }

  getYear(): number {
    return this.teamService.selectedYear;
  }

}
