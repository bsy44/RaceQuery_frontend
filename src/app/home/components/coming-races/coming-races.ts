import { Component, Input } from '@angular/core';
import { RaceModel } from '../../../races/models/race.model';
import { NAME_TO_ISO } from '../../../shared/nationalities';
import { RouterLink } from '@angular/router';
import { slugify } from '../../../races/utils/race-utils';
import {COUNTRY_TRANSLATIONS} from '../../../shared/country-translations';
import {Loading} from '../../../shared/components/loading/loading';
import {CommingRacesCard} from '../comming-races-card/comming-races-card';

@Component({
  selector: 'app-coming-races',
  standalone: true,
  imports: [
    RouterLink,
    Loading,
    CommingRacesCard
  ],
  templateUrl: './coming-races.html',
  styleUrl: './coming-races.css',
})
export class ComingRaces {
  @Input() races!: RaceModel[];
  @Input() year!: number;
  @Input() isLoading!: boolean;
  protected readonly slugify = slugify;
}
