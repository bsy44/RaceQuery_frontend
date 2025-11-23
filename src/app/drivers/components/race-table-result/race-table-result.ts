import { Component, Input } from '@angular/core';
import { NAME_TO_ISO } from "../../../shared/nationalities";
import { SeasonResult } from '../../models/season-result.model';
import { getIsoFromGpName } from '../../utils/driver-utils';

@Component({
  selector: 'app-race-table-result',
  imports: [],
  templateUrl: './race-table-result.html',
  styleUrl: './race-table-result.css',
})
export class RaceTableResult {
  protected readonly NAME_TO_ISO = NAME_TO_ISO;
  @Input() seasonResult!: SeasonResult;

  getFlag(gpName: string) {
    return getIsoFromGpName(gpName);
  }
}
