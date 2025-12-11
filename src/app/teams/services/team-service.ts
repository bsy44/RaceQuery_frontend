import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TeamModel } from '../models/team.model';
import {delay, Observable, of, tap} from 'rxjs';
import { TeamDetailModel } from '../models/teamDetail.model';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  private apiUrl = environment.API_URL;
  private cache = new Map<number, TeamModel[]>();

  years: number[] = [];
  selectedYear: number = new Date().getFullYear();

  constructor(private http: HttpClient) {
    const currentYear = new Date().getFullYear();
    this.years = Array.from({
      length: currentYear - 2022 + 1
    }, (_, i) => 2022 + i).reverse();
  }

  listTeams(): Observable<TeamModel[]> {
    const year = this.selectedYear;

    // 2. VÉRIFICATION DU CACHE
    if (this.cache.has(year)) {
      // Si on a déjà les données, retour immédiat (pas de squelette)
      return of(this.cache.get(year)!);
    }

    // 3. APPEL API (Premier chargement)
    return this.http.get<TeamModel[]>(`${this.apiUrl}/teams/${year}`).pipe(
      // Délai artificiel pour afficher le squelette la première fois (UX)
      delay(500),

      // On sauvegarde dans le cache
      tap(data => this.cache.set(year, data))
    );
  }

  getTeam(teamId: string): Observable<TeamModel> {
    return this.http.get<TeamModel>(`${this.apiUrl}/teams/${this.selectedYear}/${teamId}`);
  }

  getTeamDetail(teamId: string, season: number): Observable<TeamDetailModel> {
    return this.http.get<TeamDetailModel>(`${this.apiUrl}/teams/${season}/${teamId}/stats`);
  }

  setYear(year: number){
    this.selectedYear = year;
  }
}
