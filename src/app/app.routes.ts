import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Dashboard } from './dashboard/dashboard';
import { Drivers } from './drivers/drivers';
import { Teams } from './teams/teams';
import { Races } from './races/races';
import { RaceResult } from './race-result/race-result';
import { RaceDetail } from './race-details/race-detail';
import {NotFound} from './pages/not-found/not-found';

export const routes: Routes = [
  {path: '', redirectTo:'home', pathMatch: 'full' },
  {path: 'home', component: Dashboard},
  {path: 'driver/standings', component: Drivers},
  {path: 'team/standings', component: Teams},
  {path: 'races', component: Races},
  {path: 'race/:season/:gpName/results', component: RaceResult},
  {path: 'race/:season/:gpName/details', component: RaceDetail},
  {path:'**', component: NotFound}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
