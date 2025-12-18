import { Component, inject, OnInit } from '@angular/core';
import { TeamDetailModel } from '../../models/teamDetail.model';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TeamService } from '../../services/team-service';
import { TeamDriverCard } from '../team-driver-card/team-driver-card';
import { TeamBanner } from '../team-banner/team-banner';
import {NgClass} from '@angular/common';
import {StatsSection} from '../../../shared/components/stats-section/stats-section';
import {ScrollTop} from "../../../shared/components/scroll-top/scroll-top";

@Component({
  selector: 'app-team-standing-detail',
    imports: [
        TeamDriverCard,
        TeamBanner,
        RouterLink,
        NgClass,
        StatsSection
    ],
  templateUrl: './team-detail.html',
  styleUrl: './team-detail.css',
})
export class TeamDetail implements OnInit {
  private teamService = inject(TeamService)
  year!: number;
  idTeam!: string;
  team!: TeamDetailModel;

  constructor(
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.year = this.route.snapshot.params['season'];
    this.idTeam = this.route.snapshot.params['teamId'];

    if (typeof window !== 'undefined') {
      this.load();
    }
  }

  load(){
    this.teamService.getTeamDetail(this.idTeam, this.year).subscribe((result) => {
      this.team = result;
    })
  }

}
