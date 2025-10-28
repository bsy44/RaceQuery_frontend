import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { TableStanding } from '../../../shared/components/table-standing/table-standing';
import { TeamStandingModel } from '../../models/teamStanding.model';
import {PageHeader} from '../../../shared/components/page-header/page-header';

@Component({
  selector: 'app-team',
  templateUrl: '../../pages/teams.html',
  imports: [
    FormsModule,
    TableStanding,
    PageHeader
  ],
  styleUrls: ['./team.css']
})
export class Team implements OnInit {
  teamList: TeamStandingModel[] = [];
  years: number[] = [];
  selectedYear: number = new Date().getFullYear();
  columns = ['Pos.', 'Écurie', 'Points', 'Évo.'];

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
      .get<TeamStandingModel[]>(`http://127.0.0.1:5000/teams/standings/${this.selectedYear}`)
      .subscribe((result) => {
        this.teamList = result
      });
  }
}
