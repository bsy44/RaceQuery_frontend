import {Component, Input} from '@angular/core';
import {COUNTRY_TO_ISO} from '../../../shared/nationalities';
import {RaceModel} from '../../models/race.model';

@Component({
  selector: 'app-race-card',
  imports: [
  ],
  templateUrl: './race-card.html',
  styleUrl: './race-card.css'
})
export class RaceCard {
  protected readonly COUNTRY_TO_ISO = COUNTRY_TO_ISO;
  @Input() race!: RaceModel;

}
