import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {GoBackButton} from '../../../shared/components/go-back-button/go-back-button';
import {RaceDetailCard} from '../race-detail-card/race-detail-card';

@Component({
  selector: 'app-race-details',
  templateUrl: '../../pages/race-detail.html',
  imports: [GoBackButton, RaceDetailCard],
  styleUrls: ['./race-detail.css']
})
export class RaceDetail implements OnInit {
  round!: number;
  season!: number;
  raceData: any;

  constructor(private httpClient: HttpClient, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    const nav = this.router.lastSuccessfulNavigation;
    this.round = nav?.extras?.state?.['round'] || null;
    this.season = +this.route.snapshot.paramMap.get('season')!;

    this.getRaceDetail();
  }

  getRaceDetail() {
    this.httpClient.get<any[]>(`http://127.0.0.1:5000/events/${this.season}/${this.round}`)
      .subscribe((result: any) => {

        const formatDateRange = (
          sessions: any[] | undefined,
          raceEndStr: string | null | undefined
        ): string => {
          if (!sessions || sessions.length === 0) return '—';

          const fp1 = sessions.find(s => s.name?.toLowerCase().includes('fp1')) || sessions[0];
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

        this.raceData =  {
          circuitName: result.circuit_name,
          country: result.country,
          eventDate: formatDateRange(result.sessions, result.event_date),
          location: result.location,
          round: result.round,
          season: result.season,
          gpName: result.short_name,
          sessions: result.sessions,
          eventFormat: result.event_format
        };
      });
  }

}
