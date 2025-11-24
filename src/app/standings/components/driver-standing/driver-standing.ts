import {Component, inject, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { TableStanding } from '../table-standing/table-standing';
import { PageHeader } from '../../../shared/components/page-header/page-header';
import {DriverStandingsModel} from '../../models/driverStanding.model';
import {StandingsService} from '../../services/standings-service';

@Component({
  selector: 'app-driver-standing',
  templateUrl: './driver-standing.html',
  imports: [
    FormsModule,
    TableStanding,
    PageHeader
  ],
  styleUrls: ['./driver-standing.css']
})
export class DriverStanding implements OnInit {
  private readonly standingService = inject(StandingsService)
  driverList: DriverStandingsModel[] = [];
  columns = ['Pos.', 'Pilote', 'Écurie', 'Points', 'Évo.'];


  ngOnInit() {
    this.load();
  }

  load(){
    this.standingService.getDriverStandings().subscribe((data) => {
      this.driverList = data;
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
