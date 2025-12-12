import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TableStanding } from '../table-standing/table-standing';
import { TeamStandingModel } from '../../models/teamStanding.model';
import { PageHeader } from '../../../shared/components/page-header/page-header';
import { StandingsService } from '../../services/standings-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-team-standing',
  standalone: true,
  templateUrl: './teamsStanding.html',
  imports: [
    FormsModule,
    TableStanding,
    PageHeader,
    CommonModule
  ],
  styleUrls: ['./teamStanding.css']
})
export class TeamStanding implements OnInit {
  private readonly standingService = inject(StandingsService);
  teamList: TeamStandingModel[] = [];
  columns = ['Pos.', 'Écurie', 'Points', 'Évo.'];

  isLoading = true;

  ngOnInit() {
    this.load()
  }

  load(){
    this.isLoading = true;
    this.standingService.getTeamStandings().subscribe({
      next: (data) => {
        this.teamList = data;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  onYearChange(year: number): void {
    this.standingService.setYear(year);
    this.load();
  }

  get years(): number[] {
    return this.standingService.years;
  }

  get selectedYear(): number {
    return this.standingService.selectedYear;
  }
}
