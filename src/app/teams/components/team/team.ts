import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule for @if
import { TeamModel } from '../../models/team.model';
import { PageHeader } from '../../../shared/components/page-header/page-header';
import { TeamCard } from '../team-card/team-card';
import { RouterLink } from '@angular/router';
import {TeamService} from '../../services/team-service';
import {Loading} from '../../../shared/components/loading/loading';
import {ScrollTop} from '../../../shared/components/scroll-top/scroll-top';
import {SeoService} from '../../../shared/services/seo.service';

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [
    CommonModule,
    PageHeader,
    TeamCard,
    RouterLink,
    Loading,
    ScrollTop
  ],
  templateUrl: './team.html',
  styleUrl: './team.css',
})
export class Team implements OnInit {
  private readonly teamService = inject(TeamService);
  private readonly seoService = inject(SeoService);

  teamList: TeamModel[] = [];
  isLoading = true;

  ngOnInit() {
    this.seoService.updateMeta(
      'Écuries',
      'Visualisez les statistiques et résultats de la saison des écuries'
    );
    this.load()
  }

  load() {
    this.isLoading = true;

    this.teamService.listTeams().subscribe({
      next: (result) => {
        this.teamList = result;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  onYearChange(year: number): void {
    this.teamService.setYear(year);
    this.load();
  }

  get years(): number[] {
    return this.teamService.years;
  }

  get selectedYear(): number {
    return this.teamService.selectedYear;
  }
}
