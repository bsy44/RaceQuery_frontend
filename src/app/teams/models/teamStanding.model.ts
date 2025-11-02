import {TeamModel} from './team.model';

export interface TeamStandingModel {
  Team: TeamModel['constructorName'];
  points: string;
  points_diff: string;
  position: string;
  evolution: string;
}
