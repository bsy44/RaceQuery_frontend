import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TeamModel } from '../../models/team.model';
import { PageHeader } from '../../../shared/components/page-header/page-header';
import { TeamCard } from '../team-card/team-card';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-team',
  imports: [
    PageHeader,
    TeamCard,
    RouterLink
  ],
  templateUrl: './team.html',
  styleUrl: './team.css',
})
export class Team {
  teamList: TeamModel[] = [];
  years: number[] = [];
  selectedYear: number = new Date().getFullYear();

  constructor(private http: HttpClient) {}

  ngOnInit() {
    const currentYear = new Date().getFullYear();
    this.years = Array.from({
      length: currentYear - 2022 + 1
    }, (_, i) => 2022 + i).reverse();

    this.getTeams();
  }

  getTeams() {
    this.http
      .get<TeamModel[]>(`http://127.0.0.1:5000/teams/${this.selectedYear}`)
      .subscribe((result) => {
        this.teamList = result
      });
  }
}
