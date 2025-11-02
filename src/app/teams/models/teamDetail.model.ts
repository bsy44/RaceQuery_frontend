import {TeamModel} from './team.model';

export interface TeamDetailModel {
  Team: TeamModel;
  position: string;
  points: string;
  wins: string;
  podiums: number;
  poles: number;
  top10: number;
  dnf: number;
  sprintWins: number;
  sprintPodiums: number;
  sprintPoles: number;
  avgRaceFinish: number;
  avgQualifyingFinish: number;
}
