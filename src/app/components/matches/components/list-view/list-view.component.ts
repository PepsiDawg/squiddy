import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css']
})
export class ListViewComponent implements OnInit {
  @Input() gameData;
  @Input() mapData;
  @Input() outcomeData;
  @Output() matchClicked = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  view(index) {
    this.matchClicked.emit(index);
  }
}
