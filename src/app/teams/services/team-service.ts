import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TeamModel } from '../models/team.model';
import { Observable } from 'rxjs';
import { TeamDetailModel } from '../models/teamDetail.model';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  private apiUrl = 'http://127.0.0.1:5000/teams';

  constructor(private http: HttpClient) {}

  listTeams(year: number): Observable<TeamModel[]> {
    return this.http.get<TeamModel[]>(`${this.apiUrl}/${year}`);
  }

  getTeam(teamId: string, year: number): Observable<TeamModel> {
    return this.http.get<TeamModel>(`${this.apiUrl}/${year}/${teamId}`);
  }

  getTeamDetail(teamId: string, year: number): Observable<TeamDetailModel> {
    return this.http.get<TeamDetailModel>(`${this.apiUrl}/${year}/${teamId}/info`);
  }
}
