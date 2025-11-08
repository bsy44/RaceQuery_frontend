import { Component, OnInit } from '@angular/core';
import { TeamModel } from '../../models/team.model';
import { PageHeader } from '../../../shared/components/page-header/page-header';
import { TeamCard } from '../team-card/team-card';
import { RouterLink } from '@angular/router';
import { TeamService } from '../../services/team-service';

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
export class Team implements OnInit {
  teamList: TeamModel[] = [];
  years: number[] = [];
  selectedYear: number = new Date().getFullYear();

  constructor(private teamService: TeamService) {}

  ngOnInit() {
    const currentYear = new Date().getFullYear();
    this.years = Array.from({
      length: currentYear - 2024 + 1
    }, (_, i) => 2024 + i).reverse();

    this.loadTeams()
  }

  loadTeams() {
    this.teamService.listTeams(this.selectedYear).subscribe((result) => {
      this.teamList = result;
    });
  }

}
