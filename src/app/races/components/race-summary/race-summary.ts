import {Component, Input, input} from '@angular/core';

@Component({
  selector: 'app-race-summary',
  imports: [],
  templateUrl: './race-summary.html',
  styleUrl: './race-summary.css'
})
export class RaceSummary {
  @Input() winner!: any
  @Input() poleman!: any
  @Input() fastestLap!: any
}
