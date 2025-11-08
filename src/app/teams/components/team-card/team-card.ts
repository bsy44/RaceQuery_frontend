import { Component, Input, OnInit } from '@angular/core';
import { TEAMS_INFO } from '../../../shared/teams-info';
import { TeamModel } from '../../models/team.model';
import { NgClass } from '@angular/common';
import { TeamService } from '../../services/team-service';

@Component({
  selector: 'app-team-card',
  imports: [
    NgClass
  ],
  templateUrl: './team-card.html',
  styleUrl: './team-card.css',
})
export class TeamCard implements OnInit {
  protected readonly TEAMS_INFO = TEAMS_INFO;
  team!: TeamModel;
  @Input()idTeam!: string;
  @Input() year!: number;

  constructor(private teamService: TeamService) {}

  ngOnInit() {
    this.teamService.getTeam(this.idTeam, this.year).subscribe((result) => {
      this.team = result
    });
  }

  getCarImagePath(constructorId: string): string  | undefined {
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
