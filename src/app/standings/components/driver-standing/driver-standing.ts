import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TableStanding } from '../table-standing/table-standing';
import { PageHeader } from '../../../shared/components/page-header/page-header';
import { DriverStandingsModel } from '../../models/driverStanding.model';
import { StandingsService } from '../../services/standings-service';
import { CommonModule } from '@angular/common';
import {SeoService} from '../../../shared/services/seo.service';

@Component({
  selector: 'app-driver-standing',
  standalone: true,
  templateUrl: './driver-standing.html',
  imports: [
    FormsModule,
    TableStanding,
    PageHeader,
    CommonModule,
  ],
  styleUrls: ['./driver-standing.css']
})
export class DriverStanding implements OnInit {
  private readonly standingService = inject(StandingsService);
  private readonly seoService = inject(SeoService);

  driverList: DriverStandingsModel[] = [];
  columns = ['Pos.', 'Pilote', 'Écurie', 'Points', 'Évo.'];

  isLoading = true;

  ngOnInit() {
    this.updateSeo();
    this.load();
  }

  load(){
    this.isLoading = true;

    this.standingService.getDriverStandings().subscribe({
      next: (data) => {
        this.driverList = data;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  private updateSeo() {
    this.seoService.updateMeta(
      `Classement Pilotes F1 ${this.selectedYear}`,
      `Consultez le classement pilote du championnat du monde de Formule 1 pour la saison ${this.selectedYear}.
      Suivez l'évolution des points, des positions et la lutte pour le titre mondial.`
    );
  }

  onYearChange(year: number): void {
    this.standingService.setYear(year);
    this.updateSeo();
    this.load();
  }

  get years(): number[] {
    return this.standingService.years;
  }

  get selectedYear(): number {
    return this.standingService.selectedYear;
  }
}
