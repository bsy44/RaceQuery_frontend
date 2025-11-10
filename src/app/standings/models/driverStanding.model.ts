import {DriverModel} from '../../drivers/models/driver.model';

export interface DriverStandingsModel {
  driverId: DriverModel["driverId"];
  driver: DriverModel["fullName"];
  nationality: DriverModel["nationality"];
  team: DriverModel["team"];
  evolution: string;
  points: string;
  points_diff: string;
  position: string;
}
