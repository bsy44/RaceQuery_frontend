import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule for @if
import { TeamModel } from '../../models/team.model';
import { PageHeader } from '../../../shared/components/page-header/page-header';
import { TeamCard } from '../team-card/team-card';
import { RouterLink } from '@angular/router';
import {TeamService} from '../../services/team-service';
import {Loading} from '../../../shared/components/loading/loading';

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [
    CommonModule,
    PageHeader,
    TeamCard,
    RouterLink,
    Loading
  ],
  templateUrl: './team.html',
  styleUrl: './team.css',
})
export class Team implements OnInit {
  teamList: TeamModel[] = [];
  private teamService = inject(TeamService);

  // Variable d'état pour le chargement
  isLoading = true;

  ngOnInit() {
    this.load()
  }

  load() {
    this.isLoading = true; // Début du chargement (affiche le squelette)

    this.teamService.listTeams().subscribe({
      next: (result) => {
        this.teamList = result;
        this.isLoading = false; // Fin du chargement
      },
      error: () => {
        this.isLoading = false; // Toujours arrêter le chargement même en cas d'erreur
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
