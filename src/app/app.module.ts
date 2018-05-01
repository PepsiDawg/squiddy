import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { routing } from './app.routing';
import { environment } from '../environments/environment';

import { FirebaseService } from './services/firebase.service';
import { AuthGuardService } from './services/auth-guard.service';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { MatchesComponent } from './components/matches/matches.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { AddGameDataComponent } from './components/add-game-data/add-game-data.component';
import { MatchFormComponent } from './components/add-game-data/components/match-form/match-form.component';
import { DecayFormComponent } from './components/add-game-data/components/decay-form/decay-form.component';
import { PlacementFormComponent } from './components/add-game-data/components/placement-form/placement-form.component';
import { ListViewComponent } from './components/matches/components/list-view/list-view.component';
import { TileViewComponent } from './components/matches/components/tile-view/tile-view.component';
import { MatchViewComponent } from './components/matches/components/match-view/match-view.component';
import { SettingsComponent } from './components/settings/settings.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MatchesComponent,
    NavigationComponent,
    AddGameDataComponent,
    MatchFormComponent,
    DecayFormComponent,
    PlacementFormComponent,
    ListViewComponent,
    TileViewComponent,
    MatchViewComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    FormsModule,
    ReactiveFormsModule,
    routing
  ],
  providers: [FirebaseService, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
