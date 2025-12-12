import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NAME_TO_ISO } from '../../../shared/nationalities';

@Component({
  selector: 'app-table-standing',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table-standing.html',
  styleUrls: ['./table-standing.css']
})
export class TableStanding {
  protected readonly Math = Math;

  @Input() columns: string[] = [];
  @Input() data: any[] = [];
  @Input() tableType: 'drivers' | 'teams' = 'drivers';
  @Input() isLoading!: boolean;

  getDriverFlag(driverNationality: string): string {
    return NAME_TO_ISO[driverNationality] || 'un';
  }

  getLastName(fullName: string): string {
    if (!fullName) return '';
    const parts = fullName.split(' ');
    return parts[parts.length - 1];
  }

}
