import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Dashboard } from './home/components/dashboard/dashboard';
import { Driver } from './drivers/components/driver/driver';
import { TeamStanding } from './standings/components/team-standing/teamStanding';
import { RaceResult } from './races/components/race-result/race-result';
import { RaceDetail } from './races/components/race-details/race-detail';
import { Race } from './races/components/race/race';
import { Team } from './teams/components/team/team';
import { TeamDetail } from './teams/components/team-detail/team-detail';

export const routes: Routes = [
  {path: '', redirectTo:'home', pathMatch: 'full' },
  {path: 'home', component: Dashboard},
  {path: 'teams', component: Team},
  {path: 'teams/:season/:teamId', component: TeamDetail},
  {path: 'driver/standings', component: Driver},
  {path: 'team/standings', component: TeamStanding},
  {path: 'races', component: Race},
  {path: 'race/:season/:gpName/results', component: RaceResult},
  {path: 'race/:season/:gpName/details', component: RaceDetail},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
