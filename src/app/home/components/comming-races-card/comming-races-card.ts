import {Component, Input} from '@angular/core';
import {NAME_TO_ISO} from "../../../shared/nationalities";
import {RaceModel} from '../../../races/models/race.model';
import {COUNTRY_TRANSLATIONS} from '../../../shared/country-translations';

@Component({
  selector: 'app-comming-races-card',
  imports: [],
  templateUrl: './comming-races-card.html',
  styleUrl: './comming-races-card.css',
})
export class CommingRacesCard {
  protected readonly NAME_TO_ISO = NAME_TO_ISO;
  protected readonly COUNTRY_TRANSLATIONS = COUNTRY_TRANSLATIONS;
  @Input() race!: RaceModel;

  getCountryName(countryEn: string): string {
    return this.COUNTRY_TRANSLATIONS[countryEn] || countryEn;
  }

}
