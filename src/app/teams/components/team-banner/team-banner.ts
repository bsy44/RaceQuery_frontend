import { Component, Input } from '@angular/core';
import { NATIONALITY_TO_ISO } from "../../../shared/nationalities";
import { GoBackButton } from "../../../shared/components/go-back-button/go-back-button";
import { NgClass } from '@angular/common';
import { TeamDetailModel } from '../../models/teamDetail.model';

@Component({
  selector: 'app-team-banner',
  imports: [
    GoBackButton,
    NgClass
  ],
  templateUrl: './team-banner.html',
  styleUrl: './team-banner.css',
})
export class TeamBanner {
    protected readonly NATIONALITY_TO_ISO = NATIONALITY_TO_ISO;

    @Input() team!: TeamDetailModel
}
