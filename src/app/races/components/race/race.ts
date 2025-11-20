import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RaceCard } from '../race-card/race-card';
import { PageHeader } from '../../../shared/components/page-header/page-header';
import { RaceService } from '../../services/race-service';
import { RaceModel } from '../../models/race.model';
import { RouterLink } from '@angular/router';

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

  slugify(name: string): string {
    return name
      .toLowerCase()
      .normalize('NFD')                 // enlève les accents
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')     // remplace tout ce qui n’est pas lettre ou chiffre par "-"
      .replace(/^-+|-+$/g, '');        // retire les tirets en trop
  }
}
