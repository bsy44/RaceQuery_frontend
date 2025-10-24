export interface DriverModel {
  driver: {
    driverId: string;
    fullName: string;
    nationality: string;
    code: string;
    driverNumber: string;
    dateOfBirth: string;
  };
  team: string;
  wins: string;
  podium: string;
  points: string;
  points_diff: string;
}
