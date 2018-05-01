import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Rx';
import * as firebase from 'firebase/app';
import 'rxjs/add/operator/take';

@Injectable()
export class FirebaseService {
  private user_key: string;
  private loggedIn = false;
  private current_account;
  private current_season;
  private maps = {
    'Blizard World': 16,
    'Dorado': 0,
    'Eichenwalde': 1,
    'Hanamura': 2,
    'Hollywood': 3,
    'Horizon Lunar Colony': 4,
    'Illios': 5,
    'Junkertown': 15,
    "King's Row": 6,
    'Lijiang Tower': 7,
    'Nepal': 8,
    'Numbani': 9,
    'Oasis': 10,
    'Route 66': 11,
    'Temple of Anubis': 12,
    'Volskaya Industries': 13,
    'Watchpoint: Gibraltar': 14
  };

  constructor(private auth: AngularFireAuth, private database: AngularFireDatabase) { 
    this.auth.authState.subscribe(result => {
      if(result) {
        this.user_key = result.uid;
        this.loggedIn = true;
        this.getCurrentAccount().subscribe(account => this.current_account = account);
        this.getCurrentSeason().subscribe(season => this.current_season = season);
      } else {
        this.user_key = null;
        this.loggedIn = false;
      }
    });
  }

  private buildUserIfDoesntExist(id: string, user:any) {
    let path = "users/" + id + "/profile";
    this.database.object(path).valueChanges().take(1)
        .subscribe(result => {
          if(result == null || result == undefined) {
            this.database.object(path).set(user);
          }
        });
  }

  getAuthStatus() {
    return Observable.interval(250).map(() => {return {state: this.loggedIn}}).distinctUntilChanged();
  }

  getAccountDetailStatus() {
    return Observable.interval(250).map(() => {return {account: this.current_account, season: this.current_season}}).distinctUntilChanged();
  }

  getUserProfile() {
    return this.database.object("users/" + this.user_key + "/profile").snapshotChanges().take(1);
  }

  getCurrentSeason() {
    return this.database.object("users/" + this.user_key + "/current_season").valueChanges();
  }

  getCurrentAccount() {
    return this.database.object("users/" + this.user_key + "/current_account").valueChanges();
  }

  getPlayingGroup() {
    return this.database.object("users/" + this.user_key + "/playing_group").snapshotChanges().take(1);
  }

  getAllUserGameData() {
    return Observable.combineLatest(
      this.getCurrentAccount(),
      this.getCurrentSeason()
    ).switchMap(result => {
      if(result[0] != null && result[1] != null) {
        return this.database.object("users/" + this.user_key + "/data/season_" + result[1] + "/" + result[0]).valueChanges();
      }
      return Observable.of([]);
    });
  }

  getUserGameData(key) {
    return Observable.combineLatest(
      this.getCurrentAccount(),
      this.getCurrentSeason()
    ).switchMap(result => {
      if(result[0] != null && result[1] != null) {
        return this.database.object("users/" + this.user_key + "/data/season_" + result[1] + "/" + result[0] + "/" + key).snapshotChanges().take(1);
      }
      return undefined;
    });
  }

  getTrackedAccounts() {
    return this.database.list("users/" + this.user_key + "/tracked_accounts").valueChanges();
  }

  getTrackedSeasons() {
    return this.database.list("users/" + this.user_key + "/tracked_seasons").valueChanges();
  }

  getMaps() {
    return this.maps;
  }

  addTrackedAccount(account) {
    let path = "users/" + this.user_key + "/tracked_accounts";
    let name = account.replace('#', '');
    this.database.object(path).snapshotChanges().take(1)
        .subscribe(result => {
          let accs = result.payload.val() == null ? [] : result.payload.val();
          
          if(!accs.includes(name)) {
            accs.push(name);
            this.database.object(path).set(accs);
          }
        });
  }

  addTrackedSeason(season) {
    let path = "users/" + this.user_key + "/tracked_seasons";
    this.database.object(path).snapshotChanges().take(1)
        .subscribe(result => {
          let accs = result.payload.val() == null ? [] : result.payload.val();
          
          if(!accs.includes(season)) {
            accs.push(season);
            this.database.object(path).set(accs);
          }
        });
  }

  setCurrentSeason(season) {
    this.database.object("users/" + this.user_key + "/current_season").set(season);
  }
  
  setCurrentAccount(account: string) {
    this.database.object("users/" + this.user_key + "/current_account").set(account.replace('#', ''));
  }
  
  setPlayingGroup(group) {
    this.database.object("users/" + this.user_key + "/playing_group").set(group);
  }

  addData(payload) {
    let path = "users/" + this.user_key + "/data/season_" + this.current_season + "/" + this.current_account;
    if(this.current_season != null && this.current_account != null) {
      this.database.list(path).push(payload);
    } else {
      alert("Current Season and Account need to be set in Settings page!");
    }
  }

  updateMatch(key, payload) {
    let path = "users/" + this.user_key + "/data/season_" + this.current_season + "/" + this.current_account + "/" + key;
    this.database.object(path).update(payload);
  }

  removeTrackedAccount(account) {
    let path = "users/" + this.user_key + "/tracked_accounts";
    let name = account.replace('#', '');
    this.database.object(path).snapshotChanges().take(1)
        .subscribe(result => {
          let accs = result.payload.val() == null ? [] : result.payload.val();
          
          if(accs.includes(name)) {
            accs.splice(accs.indexOf(name), 1);
            this.database.object(path).set(accs);
          }
        });
  }

  removeGameData(key) {
    this.database.list("users/" + this.user_key + "/data/season_" + this.current_season + "/" + this.current_account).remove(key);
  }

  isLoggedIn() {
    return this.user_key != null;
  }

  loginWithGoogle() {
    return this.auth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
               .then(result => {
                  let user = {
                    name: result.user.displayName,
                    email: result.user.email,
                  };
                  this.buildUserIfDoesntExist(result.user.uid, user);
               });
  }

  logout() {
    return this.auth.auth.signOut();
  }

  private generateKey() {
    return Math.random().toString(36).substr(2, 10);
  }

}
