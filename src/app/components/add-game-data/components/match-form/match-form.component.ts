import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-match-form',
  templateUrl: './match-form.component.html',
  styleUrls: ['./match-form.component.css']
})
export class MatchFormComponent implements OnInit {
  @Input() group;
  @Input() maps;
  @Input() payload;
  @Output() onSubmit = new EventEmitter();
  leaver = false;
  mapNames = [];
  matchForm: FormGroup;

  constructor() { }

  ngOnInit() {
    this.mapNames = Object.keys(this.maps);
    this.initForm();
    if(this.payload.data) {
      this.fillInData();
    }
  }

  initForm() {
    this.matchForm = new FormGroup({
      map: new FormControl('', [Validators.required]),
      outcome: new FormControl('', [Validators.required]),
      sr: new FormControl('', [Validators.required, Validators.pattern('[0-9]+')])
    });
  }

  fillInData() {
    let data = this.payload.data;
    console.log(data);
    let formValue = {
      map: (data.map != undefined) ? data.map : '',
      outcome: (data.outcome != undefined) ? data.outcome : '',
      sr: (data.sr != undefined) ? data.sr : ''
    };
    this.leaver = (data.leaver != undefined) ? data.leaver : false;
    this.matchForm.setValue(formValue);
  }

  onGroupAdd(input) {
    if(input.value != "" && this.group.length < 5 && !this.group.includes(input.value)) {
      this.group.push(input.value);
      input.value = "";
    }
  }

  onGroupRemove(name) {
    if(this.group.includes(name)) {
      this.group.splice(this.group.indexOf(name), 1);
    }
  }

  submitForm() {
    let result = this.matchForm.value;
    let gameData = {
      type: "Match",
      data: {
        map: result.map,
        outcome: result.outcome,
        sr: result.sr,
        leaver: this.leaver
      },
      group: this.group
    };
    this.onSubmit.emit(gameData);
  }
}
