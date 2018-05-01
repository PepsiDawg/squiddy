import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-match-view',
  templateUrl: './match-view.component.html',
  styleUrls: ['./match-view.component.css']
})
export class MatchViewComponent implements OnInit {
  @Input() gameMatch;
  @Input() mapData;
  @Input() outcomeData;
  @Output() onTakeAction = new EventEmitter();

  data;

  constructor() { }

  ngOnInit() {
    this.data = this.gameMatch.match.data;
  }

  stopprop(event) {
    event.stopPropagation();
  }

  takeAction(action) {
    this.onTakeAction.emit({
      action: action,
      key: this.gameMatch.key
    });
  }
}
