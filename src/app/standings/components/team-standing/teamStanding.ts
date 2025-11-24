import {Component, inject, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { TableStanding } from '../table-standing/table-standing';
import { TeamStandingModel } from '../../models/teamStanding.model';
import {PageHeader} from '../../../shared/components/page-header/page-header';
import {StandingsService} from '../../services/standings-service';

@Component({
  selector: 'app-team-standing',
  templateUrl: './teamsStanding.html',
  imports: [
    FormsModule,
    TableStanding,
    PageHeader
  ],
  styleUrls: ['./teamStanding.css']
})
export class TeamStanding implements OnInit {
  private readonly standingService = inject(StandingsService)
  teamList: TeamStandingModel[] = [];
  columns = ['Pos.', 'Écurie', 'Points', 'Évo.'];


  ngOnInit() {
    this.load()
  }

  load(){
    this.standingService.getTeamStandings().subscribe((data) => {
      this.teamList = data;
    })
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

