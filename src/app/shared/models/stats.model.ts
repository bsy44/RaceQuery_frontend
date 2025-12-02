export interface StatModel {
  win: number;
  podium: number;
  pole: number;
  top10: number;
  dnf: number;
  avg_race_finish: number | string;
  avg_qualifying_finish: number | string;
  best_result?: number;
  q3_apprence?: number;
  sprint_win: number;
  sprint_podium: number;
  sprint_pole: number;
}
