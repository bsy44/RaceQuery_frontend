import { TeamModel } from './team.model';
import { BaseF1Stats } from '../../shared/models/stats.model';

export interface TeamDetailModel extends BaseF1Stats {
  Team: TeamModel;
}
