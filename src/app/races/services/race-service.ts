import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { RaceModel } from '../models/race.model';
import { delay, map, Observable, of, tap } from 'rxjs';
import { formatDateRange } from '../utils/race-utils';

@Injectable({
  providedIn: 'root'
})
export class RaceService {
  private readonly apiUrl = environment.API_URL;
  private cache = new Map<number, RaceModel[]>();
  private sessionCache = new Map<string, RaceResultModel>();

  years: number [] = [];
  selectedYear: number = new Date().getFullYear();

  constructor(private http: HttpClient) {
    const currentYear = new Date().getFullYear();
    this.years = Array.from({length: currentYear - 2022 + 1}, (_, i) => 2022 + i).reverse();
  }

  getAll(): Observable<RaceModel[]> {
    const year = this.selectedYear;

    if (this.cache.has(year)) {
      return of(this.cache.get(year)!);
    }

    return this.http.get<RawRace[]>(`${this.apiUrl}/races/${year}`).pipe(
      delay(500),
      map(results => results.map(race => this.mapToRaceModel(race))),
      tap(data => this.cache.set(year, data)) // Mise en cache
    );
  }

  getRace(season: number, round: number): Observable<RaceModel> {
    return this.http.get<RawRace>(`${this.apiUrl}/races/${season}/${round}`).pipe(
      map(race => this.mapToRaceModel(race))
    );
  }

  getSessionResults(season: number, round: number, session: string): Observable<RaceResultModel> {
    const cacheKey = `${season}-${round}-${session}`;

    if (this.sessionCache.has(cacheKey)) {
      return of(this.sessionCache.get(cacheKey)!);
    }

    return this.http.get<RaceResultModel>(`${this.apiUrl}/races/${season}/${round}/${session}-results`).pipe(
      delay(500),
      tap(data => this.sessionCache.set(cacheKey, data))
    );
  }

  setYear(year: number){
    this.selectedYear = year;
  }

  private mapToRaceModel(race: RawRace): RaceModel {
    const fp1Session =
      race.sessions.find(s =>
        s.name.toLowerCase().includes('practice 1') ||
        s.name.toLowerCase().includes('fp1')
      ) || race.sessions[0];

    const fp1Date = fp1Session ? new Date(fp1Session.utc_date) : null;
    const raceStarted = fp1Date ? fp1Date.getTime() < Date.now() : false;

    return {
      circuit_name: race.circuit_name,
      country: race.country,
      eventDate: formatDateRange(race.sessions, race.event_date),
      location: race.location,
      round: race.round,
      gpName: race.short_name,
      eventFormat: race.event_format,
      isFinished: raceStarted,
      sessions: race.sessions
    };
  }
}
