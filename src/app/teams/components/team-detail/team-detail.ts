import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TeamDetailModel } from '../../models/teamDetail.model';
import { ActivatedRoute } from '@angular/router';
import {GoBackButton} from '../../../shared/components/go-back-button/go-back-button';
import {TEAMS_INFO} from '../../../shared/teams-info';
import {NATIONALITY_TO_ISO} from '../../../shared/nationalities';

@Component({
  selector: 'app-team-standing-detail',
  imports: [
    GoBackButton
  ],
  templateUrl: './team-detail.html',
  styleUrl: './team-detail.css',
})
export class TeamDetail {
  protected readonly TEAMS_INFO = TEAMS_INFO;
  protected readonly NATIONALITY_TO_ISO = NATIONALITY_TO_ISO;
  year!: number;
  idTeam!: string;
  team!: TeamDetailModel;

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit() {
    this.year = this.route.snapshot.params['season'];
    this.idTeam = this.route.snapshot.params['teamId'];
    this.getTeamDetail()
  }

  getTeamDetail() {
    this.http
      .get<TeamDetailModel>(`http://127.0.0.1:5000/teams/${this.year}/${this.idTeam}`)
      .subscribe((result) => {
        console.log(result);
        this.team = result;
      });
  }
}
