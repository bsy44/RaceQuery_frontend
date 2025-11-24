interface RaceResultModel {
  DriverNumber: string;
  driver: string;
  evolution: number;
  grid_position: number;
  laps: number;
  points: number;
  position: number;
  q1?: string | null;
  q2?: string | null;
  q3?: string | null;
  status: string;
  team: string;
  teamColor?: string;
  time?: string;
}
