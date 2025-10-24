import {DriverModel} from '../../drivers/models/driver.model';

export interface DriverStandingsModel {
  DriverStandings: DriverModel[];
  season: string;
}
