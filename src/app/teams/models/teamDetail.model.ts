import { TeamModel } from './team.model';

export interface TeamDetailModel {
  Team: TeamModel;
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
}
