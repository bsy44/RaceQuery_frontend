import {Component, Input, OnChanges} from '@angular/core';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-session-result-table',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './table-results.html',
  styleUrls: ['./table-results.css']
})
export class SessionResultTableComponent implements OnChanges {
  @Input() sessionCode!: string;
  @Input() results: RaceResultModel[] = [];
  protected readonly Math = Math;
  bestQ1: string = '';
  bestQ2: string = '';
  bestQ3: string = '';

  ngOnChanges() {
    if (this.results && this.isQualifying()) {
      this.calculateBestQualiTimes();
    }
  }

  isQualifying() {
    return this.sessionCode?.includes('Q') || this.sessionCode?.startsWith('SQ');
  }
  isPractice() {
    return this.sessionCode?.includes('FP');
  }
  isRaceOrSprint() {
    return this.sessionCode?.includes('R')  ||
         (this.sessionCode?.startsWith('S') && !this.sessionCode?.startsWith('SQ'));
  }

  private timeToMs(timeStr: string | null | undefined): number {
    if (!timeStr) return Infinity;

    const cleanTime = timeStr.replace('+', '').trim();

    try {
      const parts = cleanTime.split(':');
      let seconds;

      if (parts.length === 2) {
        seconds = parseInt(parts[0]) * 60 + parseFloat(parts[1]);
      } else {
        seconds = parseFloat(parts[0]);
      }
      return isNaN(seconds) ? Infinity : seconds;
    } catch {
      return Infinity;
    }
  }

  private calculateBestQualiTimes() {
    let minQ1 = Infinity;
    let minQ2 = Infinity;
    let minQ3 = Infinity;

    this.bestQ1 = '';
    this.bestQ2 = '';
    this.bestQ3 = '';

    this.results.forEach(r => {
      const tQ1 = this.timeToMs(r.q1);
      const tQ2 = this.timeToMs(r.q2);
      const tQ3 = this.timeToMs(r.q3);

      if (tQ1 < minQ1) { minQ1 = tQ1; this.bestQ1 = r.q1 || ''; }
      if (tQ2 < minQ2) { minQ2 = tQ2; this.bestQ2 = r.q2 || ''; }
      if (tQ3 < minQ3) { minQ3 = tQ3; this.bestQ3 = r.q3 || ''; }
    });
  }

  getTyreClass(tyre: string): string {
    if (!tyre) return '';
    return tyre.toLowerCase();
  }

  getTyreLetter(tyre: string): string {
    if (!tyre) return '-';
    const t = tyre.toUpperCase();
    if (t.includes('SOFT')) return 'S';
    if (t.includes('MEDIUM')) return 'M';
    if (t.includes('HARD')) return 'H';
    if (t.includes('INTER')) return 'I';
    if (t.includes('WET')) return 'W';
    if (t.includes('TEST_UNKNOWN')) return 'T';
    return '?';
  }
}
