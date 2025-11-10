import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NATIONALITY_TO_ISO } from '../../../shared/nationalities';
import {TEAMS_LOGO} from "../../../shared/teams-logo";

@Component({
  selector: 'app-table-standing',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table-standing.html',
  styleUrls: ['./table-standing.css']
})
export class TableStanding {
  @Input() columns: string[] = [];
  @Input() data: any[] = [];
  @Input() tableType: 'drivers' | 'teams' = 'drivers';
  protected readonly TEAMS_INFO = TEAMS_LOGO;

  getDriverFlag(driverNationality: string): string {
    return NATIONALITY_TO_ISO[driverNationality] || 'un';
  }

  getLastName(fullName: string): string {
    if (!fullName) return '';
    const parts = fullName.split(' ');
    return parts[parts.length - 1];
  }

  protected readonly Math = Math;
}
