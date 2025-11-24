import {TeamModel} from '../../teams/models/team.model';

export interface TeamStandingModel {
  team: TeamModel;
  points: string;
  points_diff: string;
  position: string;
  evolution: string;
}
