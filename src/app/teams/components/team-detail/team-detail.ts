import {Component, OnInit} from '@angular/core';
import { TeamDetailModel } from '../../models/teamDetail.model';
import { ActivatedRoute } from '@angular/router';
import { TEAMS_LOGO } from '../../../shared/teams-logo';
import { TeamService } from '../../services/team-service';
import { TeamDriverCard } from '../team-driver-card/team-driver-card';
import {TeamBanner} from '../team-banner/team-banner';
import {TeamStats} from '../team-stats/team-stats';

@Component({
  selector: 'app-team-standing-detail',
  imports: [
    TeamDriverCard,
    TeamBanner,
    TeamStats
  ],
  templateUrl: './team-detail.html',
  styleUrl: './team-detail.css',
})
export class TeamDetail implements OnInit {
  protected readonly TEAMS_INFO = TEAMS_LOGO;

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
