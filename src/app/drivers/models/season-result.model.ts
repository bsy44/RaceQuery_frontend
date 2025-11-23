export interface SeasonResult {
  driver: string[];
  gps: string[];
  results: {
    [driver: string]: {
      [gp: string]: number | null;
    };
  };
}
