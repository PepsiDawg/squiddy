import { Component, OnInit } from '@angular/core';
import { Observable } from 'Rxjs';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  accounts = [];
  seasons = [];
  currentAccount;
  currentSeason;

  constructor(private firebase: FirebaseService) { }

  ngOnInit() {
    Observable.combineLatest(
      this.firebase.getTrackedAccounts(),
      this.firebase.getTrackedSeasons(),
      this.firebase.getCurrentSeason(),
      this.firebase.getCurrentAccount()
    ).subscribe(result => {
      this.accounts = result[0].sort();
      this.seasons = result[1].sort();
      this.currentSeason = (result[2] == null) ? '' : result[2];
      this.currentAccount = (result[3] == null) ? '' : result[3];
    });
  }

  addAccount(input) {
    this.firebase.addTrackedAccount(input.value);
    input.value = '';
  }

  addSeason(input) {
    this.firebase.addTrackedSeason(input.value);
    input.value = '';
  }

  setCurrentSeason(value) {
    this.firebase.setCurrentSeason(value);
  }

  setCurrentAccount(value) {
    this.firebase.setCurrentAccount(value);
  }

}
