import {Component, Input, input} from '@angular/core';
import {TEAMS_LOGO} from "../../../shared/teams-logo";

@Component({
  selector: 'app-race-info',
  imports: [],
  templateUrl: './race-info.html',
  styleUrl: './race-info.css'
})
export class RaceInfo {
  @Input() winner!: any
  @Input() poleman!: any
  @Input() fastestLap!: any

    protected readonly TEAMS_INFO = TEAMS_LOGO;
}
