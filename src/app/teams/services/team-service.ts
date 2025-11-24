import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TeamModel } from '../models/team.model';
import { Observable } from 'rxjs';
import { TeamDetailModel } from '../models/teamDetail.model';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  private apiUrl = environment.API_URL;
  years: number[] = [];
  selectedYear: number = new Date().getFullYear();

  constructor(private http: HttpClient) {
    const currentYear = new Date().getFullYear();
    this.years = Array.from({
      length: currentYear - 2022 + 1
    }, (_, i) => 2022 + i).reverse();
  }

  listTeams(): Observable<TeamModel[]> {
    return this.http.get<TeamModel[]>(`${this.apiUrl}/teams/${this.selectedYear}`);
  }

  getTeam(teamId: string): Observable<TeamModel> {
    return this.http.get<TeamModel>(`${this.apiUrl}/teams/${this.selectedYear}/${teamId}`);
  }

  getTeamDetail(teamId: string, season: number): Observable<TeamDetailModel> {
    return this.http.get<TeamDetailModel>(`${this.apiUrl}/teams/${season}/${teamId}/stats`);
  }

  setYear(year: number){
    this.selectedYear = year;
  }
}
