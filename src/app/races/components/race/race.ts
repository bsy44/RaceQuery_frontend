import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RaceCard } from '../race-card/race-card';
import { PageHeader } from '../../../shared/components/page-header/page-header';
import { RaceService } from '../../services/race-service';
import { RaceModel } from '../../models/race.model';
import { RouterLink } from '@angular/router';
import {slugify} from '../../utils/race-utils';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RaceCard,
    PageHeader,
    RouterLink
  ],
  templateUrl: './races.html',
  styleUrl: './race.css'
})

export class Race implements OnInit{
  protected readonly slugify = slugify;
  private readonly raceService = inject(RaceService);
  raceList: RaceModel[] = [];

  ngOnInit() {
    this.load();
  }

  load(){
    this.raceService.getAll().subscribe((result) => {
      this.raceList = result;
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
