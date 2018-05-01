import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { Observable } from 'Rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private firebase: FirebaseService) { }
  loggedin = false;
  ngOnInit() {
    this.firebase.getAuthStatus().subscribe(result => this.loggedin = result.state);
  }

  login() {
    this.firebase.loginWithGoogle();
  }

  logout() {
    this.firebase.logout();
  }

  // doOtherThing() {
  //   this.firebase.setCurrentAccount("PepsiDog#1234" + Math.floor(Math.random()*10));
  //   this.firebase.setCurrentSeason(10);
  // }

  // addMatch() {
  //   if(Math.random() < 0.5) {
  //     this.firebase.addData(this.randomID(), "decay", {amount: 25});
  //   } else {
  //     this.firebase.addData(this.randomID(), "match", {map: "test match", outcome: "won"});
  //   }
  // }

  // doThing() {
  //   this.firebase.getUserGameData().subscribe(result => {
  //     this.gameData = result;
  //     this.keyData = [];
  //     for(let key in result) {
  //       this.keyData.push(key);
  //     }
  //   });
  // }

  // doTThing() {
  //   this.firebase.getTrackedAccounts()
  //       .subscribe(result => {
  //         console.log(result);
  //         this.accounts = result;
  //       });
  // }

  // remove(key) {
  //   this.firebase.removeGameData(key);
  //   console.log("removed " + key);
  // }

  // randomID() {
  //   return Math.random().toString(36).substr(2, 28);
  // }

  // addT() {
  //   this.firebase.addTrackedAccount("PepsiDog#" + Math.floor(Math.random() * 100));
  // }

  // removeT(name) {
  //   this.firebase.removeTrackedAccount(name);
  // }

  // getgroup() {
  //   this.firebase.getPlayingGroup()
  //       .subscribe(result => {
  //         this.group = result.payload.val();
  //       });
  // }

  // setgroup() {
  //   let length = Math.floor(Math.random() * 10) + 1;
  //   let newgroup = [];
  //   for(let i = 0; i < length; i++) {
  //     newgroup.push(Math.random());
  //   }

  //   this.firebase.setPlayingGroup(newgroup);
  // }
}
