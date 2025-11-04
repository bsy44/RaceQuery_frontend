import { Component, Input } from '@angular/core';
import { TEAMS_INFO } from '../../../shared/teams-info';
import { TeamModel } from '../../models/team.model';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-team-card',
  imports: [
    NgClass
  ],
  templateUrl: './team-card.html',
  styleUrl: './team-card.css',
})
export class TeamCard {
  protected readonly TEAMS_INFO = TEAMS_INFO;
  @Input() team!: TeamModel;
  @Input() year!: number;

  getCarImagePath(constructorId: string): string {
    return `team-car/${this.year}-${constructorId}-car.avif`;
  }

  onImageError(event: Event, constructorId: string) {
    const img = event.target as HTMLImageElement;
    if (img.src.endsWith('.avif')) {
      img.src = `team-car/${this.year}-${constructorId}-car.png`;
    } else {
      img.style.display = 'none';
    }
  }

}
