import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { TableStanding } from '../../../shared/components/table-standing/table-standing';
import { TeamModel } from '../../models/team.model';
import { SelectorYears } from '../../../shared/components/selector-years/selector-years';

@Component({
  selector: 'app-team',
  templateUrl: '../../pages/teams.html',
  imports: [
    FormsModule,
    TableStanding,
    SelectorYears
  ],
  styleUrls: ['./team.css']
})
export class Team implements OnInit {
  teamList: TeamModel[] = [];
  years: number[] = [];
  selectedYear: number = new Date().getFullYear();
  columns = ['Pos', 'Écurie', 'Points'];

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
      .get<TeamModel[]>(`http://127.0.0.1:5000/teams/standings/${this.selectedYear}`)
      .subscribe((result) => {
        this.teamList = result
      });
  }
}
