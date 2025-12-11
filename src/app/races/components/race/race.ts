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
  ],
  templateUrl: './races.html',
  styleUrl: './race.css'
})

export class Race implements OnInit {
  protected readonly slugify = slugify;
  private readonly raceService = inject(RaceService);

  raceList: RaceModel[] = [];
  isLoading = true;

  ngOnInit() {
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

  onYearChange(year: number): void {
    this.raceService.setYear(year);
    this.load();
  }

  get years(): number[] {
    return this.raceService.years;
  }

  get selectedYear(): number {
    return this.raceService.selectedYear;
  }
}
