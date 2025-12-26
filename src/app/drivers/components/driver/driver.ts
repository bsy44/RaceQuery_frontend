import { Component, inject, OnInit } from '@angular/core';
import { DriverService } from '../../services/driver.service';
import { DriverModel } from '../../models/driver.model';
import { PageHeader } from '../../../shared/components/page-header/page-header';
import { DriverCard } from '../driver-card/driver-card';
import { RouterLink } from '@angular/router';
import { Loading } from '../../../shared/components/loading/loading';
import { CommonModule } from '@angular/common';
import {ScrollTop} from '../../../shared/components/scroll-top/scroll-top';
import {SeoService} from '../../../shared/services/seo.service';

@Component({
  selector: 'app-driver',
  imports: [
    CommonModule,
    PageHeader,
    DriverCard,
    RouterLink,
    Loading,
    ScrollTop,
  ],
  templateUrl: './driver.html',
  styleUrls: ['./driver.css'],
  standalone: true
})
export class Driver implements OnInit {
  private readonly driverService = inject(DriverService);
  private readonly seoService = inject(SeoService);

  drivers: DriverModel[] = [];
  isLoading = true;
  skeletonItems = Array(20).fill(0);

  ngOnInit(): void {
    this.seoService.updateMeta(
      'Pilotes',
      'Visualisez la saison complète des pilotes à travers leurs statistiques et résultats'
    );
    this.load();
  }

  load(){
    this.isLoading = true;

    this.driverService.getAllDrivers().subscribe({
      next: (data) => {
        this.drivers = data;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  onYearChange(year: number): void {
    this.driverService.setYear(year);
    this.load();
  }

  get years(): number[] {
    return this.driverService.years;
  }

  get selectedYear(): number {
    return this.driverService.selectedYear;
  }
}
