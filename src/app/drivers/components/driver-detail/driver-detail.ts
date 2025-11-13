import { Component, inject, OnInit } from '@angular/core';
import { DriverService } from '../../services/driver.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { DriverStats } from '../../models/driverStats.model';

@Component({
  selector: 'app-driver-standing-detail',
  imports: [],
  templateUrl: './driver-detail.html',
  styleUrl: './driver-detail.css',
})
export class DriverDetail implements OnInit {
  private driverService = inject(DriverService);
  driverId!: string;
  driver: Observable<DriverStats> = new Observable();

  constructor(
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.driverId = this.route.snapshot.params['driverId'];
    this.driver = this.driverService.getDriverStats(this.driverId);
  }
}
