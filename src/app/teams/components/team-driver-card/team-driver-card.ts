import { Component, Input } from '@angular/core';
import { NATIONALITY_TO_ISO } from "../../../shared/nationalities";
import { TeamDetailModel } from '../../models/teamDetail.model';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-team-driver-card',
  imports: [
    NgClass
  ],
  templateUrl: './team-driver-card.html',
  styleUrl: './team-driver-card.css',
})
export class TeamDriverCard {
  protected readonly NATIONALITY_TO_ISO = NATIONALITY_TO_ISO;
  @Input() team!: TeamDetailModel
}
