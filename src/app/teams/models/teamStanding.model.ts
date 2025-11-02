import {TeamModel} from './TeamModel';

export interface TeamStandingModel {
  Team: TeamModel['constructorName'];
  points: string;
  points_diff: string;
  position: string;
  evolution: string;
}
