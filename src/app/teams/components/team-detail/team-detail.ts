import {Component, OnInit} from '@angular/core';
import { TeamDetailModel } from '../../models/teamDetail.model';
import { ActivatedRoute } from '@angular/router';
import { GoBackButton } from '../../../shared/components/go-back-button/go-back-button';
import { TEAMS_INFO } from '../../../shared/teams-info';
import { NATIONALITY_TO_ISO } from '../../../shared/nationalities';
import { NgClass } from '@angular/common';
import {TeamService} from '../../services/team-service';

@Component({
  selector: 'app-team-standing-detail',
  imports: [
    GoBackButton,
    NgClass
  ],
  templateUrl: './team-detail.html',
  styleUrl: './team-detail.css',
})
export class TeamDetail implements OnInit {
  protected readonly TEAMS_INFO = TEAMS_INFO;
  protected readonly NATIONALITY_TO_ISO = NATIONALITY_TO_ISO;

  year!: number;
  idTeam!: string;
  team!: TeamDetailModel;

  constructor(
    private teamService: TeamService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.year = this.route.snapshot.params['season'];
    this.idTeam = this.route.snapshot.params['teamId'];
    this.teamService.getTeamDetail(this.idTeam, this.year).subscribe((result) => {
      this.team = result;
    })
  }


}
