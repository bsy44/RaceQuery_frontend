import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RaceCard } from '../race-card/race-card';
import { PageHeader } from '../../../shared/components/page-header/page-header';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RaceCard,
    PageHeader
  ],
  templateUrl: '../../pages/races.html',
  styleUrl: './race.css'
})

export class Race implements OnInit{
  years: number [] = [];
  raceList: any[] = [];
  selectedYear: number = new Date().getFullYear();

  constructor(private http:HttpClient) {}

  ngOnInit() {
    const currentYear = new Date().getFullYear();
    this.years = Array.from({length: currentYear - 2024 + 1}, (_, i) => 2024 + i).reverse();
    this.getRaces();
  }


  getRaces() {
    this.http.get(`http://127.0.0.1:5000/events/${this.selectedYear}`).subscribe((result: any) => {

      const formatDateRange = (
        sessions: any[] | undefined,
        raceEndStr: string | null | undefined
      ): string => {
        if (!sessions || sessions.length === 0) return '—';

        const fp1 = sessions.find((s: any) => s.name?.toLowerCase().includes('fp1')) || sessions[0];
        const startStr = fp1?.local_date;
        const endStr = raceEndStr;

        if (!startStr || !endStr) return '—';

        const start = new Date(startStr.replace(' ', 'T'));
        const end = new Date(endStr.replace(' ', 'T'));

        if (isNaN(start.getTime()) || isNaN(end.getTime())) return '—';

        const startDay = start.getDate().toString().padStart(2, '0');
        const endDay = end.getDate().toString().padStart(2, '0');
        const month = end.toLocaleDateString('fr-FR', { month: 'short' })
          .replace('.', '')
          .toUpperCase();

        return `${startDay} - ${endDay} ${month}`;
      };

      this.raceList = (result || []).map((race: any) => {
        const fp1Session = race.sessions?.find((s: any) => {
          const name = s.name?.toLowerCase().replace(/\s+/g, '');
          return name === 'practice1' || name === 'fp1';
        });

        const fp1Date = fp1Session ? new Date(fp1Session.utc_date) : null;
        const raceStarted = fp1Date ? fp1Date.getTime() < Date.now() : false;

        return {
          circuitName: race.circuit_name,
          country: race.country,
          eventDate: formatDateRange(race.sessions, race.event_date),
          location: race.location,
          round: race.round,
          gpName: race.short_name,
          eventFormat: race.event_format,
          isFinished: raceStarted,
        };
      });
    });
  }
}
