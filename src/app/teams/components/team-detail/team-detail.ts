import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TeamDetailModel } from '../../models/teamDetail.model';

@Component({
  selector: 'app-team-detail',
  imports: [],
  templateUrl: './team-detail.html',
  styleUrl: './team-detail.css',
})
export class TeamDetail {
  year!: number;
  idTeam!: string;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getTeamDetail()
  }

  getTeamDetail() {
    this.http
      .get<TeamDetailModel>(`http://127.0.0.1:5000/teams/${this.year}/${this.idTeam}/stats`)
      .subscribe((result) => {
        return  result
      });
  }
}
