import {Component, Input} from '@angular/core';
import {COUNTRY_TO_ISO} from '../../nationalities';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-race-card',
  imports: [
    RouterLink
  ],
  templateUrl: './race-card.html',
  styleUrl: './race-card.css'
})
export class RaceCard {
  @Input() raceIsFinished!: boolean;
  @Input() raceGpName!: string;
  @Input() raceCountry!: string;
  @Input() raceRound!: number;
  @Input() raceLocation!: string;
  @Input() raceEventFormat!: string;
  @Input() raceEventDate!: string;
  @Input() selectedYear!: number;


  slugify(name: string): string {
    return name
      .toLowerCase()
      .normalize('NFD')                 // enlève les accents
      .replace(/[\u0300-\u036f]/g, '') // idem accents
      .replace(/[^a-z0-9]+/g, '-')     // remplace tout ce qui n’est pas lettre ou chiffre par "-"
      .replace(/^-+|-+$/g, '');        // retire les tirets en trop
  }

  getFlagClass(country: string): string {
    return  COUNTRY_TO_ISO[country] || 'xx';
  }
}
