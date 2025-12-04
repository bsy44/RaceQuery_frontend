import { Component, inject, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SessionResultTableComponent } from '../table-results/table-results';
import { GoBackButton } from '../../../shared/components/go-back-button/go-back-button';
import { RaceService } from '../../services/race-service';
import { RaceModel } from '../../models/race.model';
import { RaceSummary } from '../race-summary/race-summary';

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
  season!: number;
  round!: number;
  race!: RaceModel;
  raceList: RaceResultModel[] = [];
  isLoading = false;
  sessionCode: string = 'FP1';
  sessions: string[] = [];

  winner!: any;
  pole!: any;
  fastestLap!: any;

  sessionMapping: { [key: string]: string } = {
    'Essais libres 1': 'FP1',
    'Essais libres 2': 'FP2',
    'Essais libres 3': 'FP3',
    'Qualification': 'Q',
    'Qualification sprint': 'SQ',
    'Course sprint': 'S',
    'Course': 'R'
  };

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    const nav = this.router.lastSuccessfulNavigation;
    this.season = +this.route.snapshot.paramMap.get('season')!;
    if (nav?.extras?.state?.['round']) {
      this.round = nav.extras.state['round'];
      this.loadRaceData();
    }
  }

  loadRaceData() {
    this.raceService.getRace(this.season, this.round).subscribe(event => {
      this.race = event;

      this.sessions = event.sessions.map(s => this.getFrenchSessionName(s.name));

      this.sessionCode = this.determineLastCompletedSession();

      this.getSessionResult();
    });
  }

  private getFrenchSessionName(apiName: string): string {
    const name = apiName.toLowerCase();
    if (name.includes('practice 1')) return 'Essais libres 1';
    if (name.includes('practice 2')) return 'Essais libres 2';
    if (name.includes('practice 3')) return 'Essais libres 3';
    if (name.includes('sprint qualifying') || name.includes('sprint shootout')) return 'Qualification sprint';
    if (name.includes('qualifying')) return 'Qualification';
    if (name.includes('sprint')) return 'Course sprint';
    if (name.includes('race')) return 'Course';
    return apiName;
  }

  private determineLastCompletedSession(): string {
    if (!this.race || !this.race.sessions) return 'FP1';

    const now = new Date();
    let lastCompletedCode = 'FP1';

    for (const session of this.race.sessions) {
      const dateStr = session.utc_date || session.local_date;
      if (!dateStr) continue;

      const sessionDate = new Date(dateStr);

      if (sessionDate < now) {
        lastCompletedCode = this.getCodeFromApiName(session.name);
      }
    }
    return lastCompletedCode;
  }

  private getCodeFromApiName(apiName: string): string {
    const map: { [key: string]: string } = {
      'Practice 1': 'FP1',
      'Practice 2': 'FP2',
      'Practice 3': 'FP3',
      'Qualifying': 'Q',
      'Sprint Qualifying': 'SQ',
      'Sprint': 'S',
      'Race': 'R'
    };
    return map[apiName] || 'R';
  }

  getSessionResult() {
    if (!this.sessionCode) return;

    const session = this.sessionCode.trim().toUpperCase();
    this.isLoading = true;

    this.raceService.getSessionResults(this.season, this.round, session)
      .subscribe({
        next: (response: any) => {
          this.winner = response.winner || null;
          this.pole = response.poleman || null;
          this.fastestLap = response.fastestLap || null;
          this.raceList = response.results || [];
          this.isLoading = false;
        },
        error: (err) => {
          console.error("Erreur chargement session", err);
          this.isLoading = false;
        }
      });
  }

  onSessionChange(newCode: string) {
    this.sessionCode = newCode;
    this.getSessionResult();

    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  }
}
