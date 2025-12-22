export interface BaseF1Stats {
  position: string;
  points: string;
  win: string;
  podium: number;
  pole: number;
  top10: number;
  dnf: number;
  sprint_win: number;
  sprint_podium: number;
  sprint_pole: number;
  avg_race_finish: number;
  avg_qualifying_finish: number;
  total_races: number;
}

export interface DriverSpecificStats {
  q3_appearance: number;
  total_quali: number;
  best_result: number;
  best_quali_result: number;
}
