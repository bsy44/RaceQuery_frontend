import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SessionResultTableComponent } from '../table-results/table-results';
import { GoBackButton } from '../../../shared/components/go-back-button/go-back-button';
import { RaceService } from '../../services/race-service';
import { RaceModel } from '../../models/race.model';
import {RaceSummary} from '../race-summary/race-summary';

@Component({
  selector: 'app-race-result',
  standalone: true,
  imports: [
    FormsModule,
    SessionResultTableComponent,
    RaceSummary,
    GoBackButton
  ],
  templateUrl: './race-result.html',
  styleUrls: ['./race-result.css']
})
export class RaceResult implements OnInit {
  private readonly raceService: RaceService = inject(RaceService);

  round!: number;
  race!: RaceModel;
  raceList: RaceResultModel[] = [];
  isLoading = false;
  sessionCode: string = 'R';
  sessions: string[] = [];
  winner!: string;
  pole!: string;
  fastestLap!: string;

  sessionMapping: { [key: string]: string } = {
    'Essais libres 1': 'FP1',
    'Essais libres 2': 'FP2',
    'Essais libres 3': 'FP3',
    'Qualification': 'Q',
    'Qualification sprint': 'SQ',
    'Course sprint': 'S',
    'Course': 'R'
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const nav = this.router.lastSuccessfulNavigation;
    this.round = nav?.extras?.state?.['round']!;

    this.raceService.getRace(this.round)
      .subscribe(event => {
        this.race = event;

        this.sessions = event.eventFormat === 'sprint_qualifying'
          ? ['Essais libres 1', 'Qualification sprint', 'Qualification', 'Course sprint', 'Course']
          : ['Essais libres 1', 'Essais libres 2', 'Essais libres 3', 'Qualification', 'Course'];

        this.sessionCode = this.sessionMapping['Course'];

        this.getSessionResult();
      });
  }

  getSessionResult() {
    if (!this.sessionCode) return;

    const session = this.sessionCode.trim().toUpperCase();
    this.isLoading = true;

    this.raceService.getSessionResults(session, this.round)
      .subscribe({
        next: (response: any) => {
          this.winner = response.winner || null;
          this.pole = response.poleman || null;
          this.fastestLap = response.fastestLap || null;

          this.raceList = response.results || [];

          this.isLoading = false;
        }
      });
  }

  getSessionLabel(code: string): string {
    return Object.entries(this.sessionMapping)
      .find(([label, val]) => val === code)?.[0] || '';
  }

  getSeason(): number {
    return this.raceService.selectedYear;
  }
}
