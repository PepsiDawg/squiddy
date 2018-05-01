import { Router, RouterModule } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';

import { HomeComponent } from './components/home/home.component';
import { MatchesComponent } from './components/matches/matches.component';
import { AddGameDataComponent } from './components/add-game-data/add-game-data.component';
import { SettingsComponent } from './components/settings/settings.component';

export const routing = RouterModule.forRoot([
  { path: '', component: HomeComponent },
  { path: 'matches', component: MatchesComponent, canActivate: [AuthGuardService] },
  { path: 'matches/new', component: AddGameDataComponent, canActivate: [AuthGuardService]},
  { path: 'matches/edit/:id', component: AddGameDataComponent, canActivate: [AuthGuardService]},
  { path: 'settings', component: SettingsComponent, canActivate: [AuthGuardService]}
]);