import {TeamModel} from '../../teams/models/team.model';

export interface TeamStandingModel {
  team: TeamModel['constructorName'];
  points: string;
  points_diff: string;
  position: string;
  evolution: string;
}
