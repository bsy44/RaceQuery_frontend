import {Component, Input} from '@angular/core';
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-race-detail-card',
    imports: [
        DatePipe
    ],
  templateUrl: './race-detail-card.html',
  styleUrl: './race-detail-card.css'
})
export class RaceDetailCard {
  @Input() sessionName!: string;
  @Input() sessionDate!: any;
  @Input() ind!: number;


  getSessionClass(name: string): string {
    const n = name.toLowerCase();
    if (n.includes('practice')) return 'free-practice';
    if (n.includes('sprint') || n.includes('sprint qualifying')) return 'sprint';
    if (n.includes('qualifying')) return 'quali';
    if (n.includes('race')) return 'race';
    return '';
  }

  translateSessionName(sessionName: string, index: number): string {
    const name = sessionName.toLowerCase();

    if (name.includes('practice')) {
      return `Essais Libres ${index + 1}`;
    }
    if (name.includes('sprint qualifying')) return 'Qualification Sprint';
    if (name.includes('qualifying')) return 'Qualification';
    if (name.includes('sprint')) return 'Sprint';
    if (name.includes('race')) return 'Course';

    return sessionName;
  }

}
