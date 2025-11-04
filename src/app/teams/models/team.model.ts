import {DriverModel} from '../../drivers/models/driver.model';

export interface TeamModel {
  constructorId: string;
  nationality: string;
  constructorName: string;
  drivers: DriverModel[];
}
