import { Component, Input } from '@angular/core';
import { NAME_TO_ISO } from '../../../shared/nationalities';
import { RaceModel } from '../../models/race.model';

@Component({
  selector: 'app-race-card',
  imports: [
  ],
  templateUrl: './race-card.html',
  styleUrl: './race-card.css'
})
export class RaceCard {
  protected readonly NAME_TO_ISO = NAME_TO_ISO;
  @Input() race!: RaceModel;

}
