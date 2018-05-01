import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatchFormComponent } from './components/match-form/match-form.component';
import { DecayFormComponent } from './components/decay-form/decay-form.component';
import { PlacementFormComponent } from './components/placement-form/placement-form.component';
import { FirebaseService } from '../../services/firebase.service';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-add-game-data',
  templateUrl: './add-game-data.component.html',
  styleUrls: ['./add-game-data.component.css']
})
export class AddGameDataComponent implements OnInit {
  action = "Add";
  type: string;
  key: string;
  group = [];
  maps;
  leaver = false;
  payload = {};

  constructor(private firebase: FirebaseService, private router: Router, private route: ActivatedRoute) {
    this.type = "";
   }

  ngOnInit() {
    this.route.params.subscribe(param => {
      this.maps = this.firebase.getMaps();
      if(param.id) {
        this.action = "Edit"
        this.key = param.id;
        this.firebase.getUserGameData(this.key).subscribe(result => {
          if(result) {
            let data = result.payload.val();
            this.payload = data;
            this.type = data.type;
            this.group = (data.group != null) ? data.group : []
          }
        });
      } else {
        this.type = "Match";
      }
    });
    this.firebase.getPlayingGroup().subscribe(result => {
      this.group = (result.payload.val() != null) ? result.payload.val() : [];
    });
  }

  onSubmit(data) {
    if(this.action === "Add") {
      this.firebase.addData(data);
      this.firebase.setPlayingGroup(this.group);
    } else {
      this.firebase.updateMatch(this.key, data);
    }
    this.router.navigate(['matches']);
  }
}
