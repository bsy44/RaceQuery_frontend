import { DriverModel } from './driver.model';
import { BaseF1Stats, DriverSpecificStats } from '../../shared/models/stats.model';

export interface DriverStats extends BaseF1Stats, DriverSpecificStats {
  Driver: DriverModel;
}

