import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RaceCard } from '../race-card/race-card';
import { PageHeader } from '../../../shared/components/page-header/page-header';
import { RaceService } from '../../services/race-service';
import { RaceModel } from '../../models/race.model';
import { RouterLink } from '@angular/router';
import { slugify } from '../../utils/race-utils';
import { Loading } from '../../../shared/components/loading/loading';
import {ScrollTop} from "../../../shared/components/scroll-top/scroll-top";
import {SeoService} from '../../../shared/services/seo.service';

@Component({
  selector: 'app-events',
  standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        RaceCard,
        PageHeader,
        RouterLink,
        Loading,
        ScrollTop,
    ],
  templateUrl: './races.html',
  styleUrl: './race.css'
})

export class Race implements OnInit {
  protected readonly slugify = slugify;
  private readonly raceService = inject(RaceService);
  private readonly seoService = inject(SeoService);

  raceList: RaceModel[] = [];
  isLoading = true;

  ngOnInit() {
    this.updateSeo();
    this.load();
  }

  load() {
    this.isLoading = true;

    this.raceService.getAll().subscribe({
      next: (result) => {
        this.raceList = result;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  private updateSeo() {
    this.seoService.updateMeta(
      `Calendrier et Résultat de la saison ${this.selectedYear}`,
      'Retrouvez les calendriers et les résultats des sessions des saisons de F1'
    );
  }

  onYearChange(year: number): void {
    this.raceService.setYear(year);
    this.updateSeo();
    this.load();
  }

  get years(): number[] {
    return this.raceService.years;
  }

  get selectedYear(): number {
    return this.raceService.selectedYear;
  }
}
