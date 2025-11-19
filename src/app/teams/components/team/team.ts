import {Component, inject, OnInit} from '@angular/core';
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
  private teamService = inject(TeamService);

  ngOnInit() {
    this.load()
  }

  load() {
    this.teamService.listTeams().subscribe((result) => {
      this.teamList = result;
    });
  }

  onYearChange(year: number): void {
    this.teamService.setYear(year);
    this.load();
  }

  get years(): number[] {
    return this.teamService.years;
  }

  get selectedYear(): number {
    return this.teamService.selectedYear;
  }
}
