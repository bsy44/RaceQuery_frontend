import {TeamModel} from './TeamModel';

export interface TeamStandingModel {
  Team: TeamModel;
  points: string;
  points_diff: string;
  position: string;
}
