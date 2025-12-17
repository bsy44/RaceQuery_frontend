import { Component, Input } from '@angular/core';
import { RaceModel } from '../../../races/models/race.model';
import { NAME_TO_ISO } from '../../../shared/nationalities';
import { RouterLink } from '@angular/router';
import { slugify } from '../../../races/utils/race-utils';
import {COUNTRY_TRANSLATIONS} from '../../../shared/country-translations';
import {Loading} from '../../../shared/components/loading/loading';

@Component({
  selector: 'app-race-schedule',
  standalone: true,
  imports: [
    RouterLink,
    Loading
  ],
  templateUrl: './race-schedule.html',
  styleUrl: './race-schedule.css',
})
export class RaceSchedule {
  protected readonly NAME_TO_ISO = NAME_TO_ISO;
  protected readonly COUNTRY_TRANSLATIONS = COUNTRY_TRANSLATIONS

  @Input() races!: RaceModel[];
  @Input() year!: number;
  @Input() isLoading!: boolean;
  protected readonly slugify = slugify;

  getCountryName(countryEn: string): string {
    return this.COUNTRY_TRANSLATIONS[countryEn] || countryEn;
  }
}
