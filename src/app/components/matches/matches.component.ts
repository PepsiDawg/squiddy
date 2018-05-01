import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../../services/firebase.service';
import { ListViewComponent } from './components/list-view/list-view.component';
import { MatchViewComponent } from './components/match-view/match-view.component';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css']
})
export class MatchesComponent implements OnInit {
  gameData = [];
  mapData = [];
  outcomeData = ["Win", "Draw", "Loss"];
  viewMatch = false;
  gameMatch = undefined;

  constructor(private firebase: FirebaseService, private router: Router) { }

  ngOnInit() {
    this.firebase.getAllUserGameData().subscribe(result => {
      let arr = [];
      for(let key in result) {
        let temp = {
          key: key,
          match: result[key]
        }
        arr.push(temp);
      }
      this.gameData = arr;
    });
    let maps = this.firebase.getMaps();
    for(let map in maps) {
      this.mapData[maps[map]] = map;
    }
  }

  detailedView(index) {
    this.gameMatch = this.gameData[index];
    this.viewMatch = true;
  }

  onTakeAction(event) {
    if(event.action==="edit") {
      this.router.navigate(['matches/edit/', event.key])
    } else if(event.action==="delete") {
      this.firebase.removeGameData(event.key);
      this.closeView();
    }
  }

  closeView() { 
    this.viewMatch = false;
  }
}
