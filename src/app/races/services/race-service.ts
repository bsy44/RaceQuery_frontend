import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { RaceModel } from '../models/race.model';
import { map, Observable } from 'rxjs';
import { formatDateRange } from '../utils/race-utils';

@Injectable({
  providedIn: 'root'
})
export class RaceService {
  private readonly apiUrl = environment.API_URL;
  years: number [] = [];
  selectedYear: number = new Date().getFullYear();

  constructor(private http: HttpClient) {
    const currentYear = new Date().getFullYear();
    this.years = Array.from({length: currentYear - 2022 + 1}, (_, i) => 2022 + i).reverse();
  }

  getAll(): Observable<RaceModel[]> {
    return this.http.get<RawRace[]>(`${this.apiUrl}/races/${this.selectedYear}`).pipe(
      map(results => results.map(race => this.mapToRaceModel(race)))
    );
  }

  getRace(round: number): Observable<RaceModel> {
    return this.http.get<RawRace>(`${this.apiUrl}/races/${this.selectedYear}/${round}`).pipe(
      map(race => this.mapToRaceModel(race))
    );
  }

  getSessionResults(session: string, round: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/races/${this.selectedYear}/${round}/${session}-results`);
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
