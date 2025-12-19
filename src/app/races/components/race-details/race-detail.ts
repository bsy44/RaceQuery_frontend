import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {GoBackButton} from '../../../shared/components/go-back-button/go-back-button';
import {RaceDetailCard} from '../race-detail-card/race-detail-card';
import {RaceService} from '../../services/race-service';
import {RaceModel} from '../../models/race.model';
import {NAME_TO_ISO} from "../../../shared/nationalities";

@Component({
  selector: 'app-race-details',
  templateUrl: './race-detail.html',
  imports: [GoBackButton, RaceDetailCard],
  styleUrls: ['./race-detail.css']
})
export class RaceDetail implements OnInit {
  raceService: RaceService = inject(RaceService);
  round!: number;
  season!: number;
  race!: RaceModel;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    const nav = this.router.lastSuccessfulNavigation;
    this.round = nav?.extras?.state?.['round'] || null;
    this.season = +this.route.snapshot.paramMap.get('season')!;

    this.load();
  }

  load(){
    this.raceService.getRace(this.season, this.round).subscribe((result) => {
      this.race = result;
    })
  }

    protected readonly NAME_TO_ISO = NAME_TO_ISO;
}
