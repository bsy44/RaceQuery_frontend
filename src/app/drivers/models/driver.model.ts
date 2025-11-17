export interface DriverModel {
  driverId: string;
  fullName: string;
  nationality: string;
  code: string;
  driverNumber: string;
  date_of_birth: string | null;
  team: string | null;
  team_id: string | null;
}
