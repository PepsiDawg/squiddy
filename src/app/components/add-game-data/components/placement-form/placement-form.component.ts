import { Component, OnInit, EventEmitter, Input, Output  } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-placement-form',
  templateUrl: './placement-form.component.html',
  styleUrls: ['./placement-form.component.css']
})
export class PlacementFormComponent implements OnInit {

  @Input() group;
  @Input() maps;
  @Input() payload;
  @Output() onSubmit = new EventEmitter();
  mapNames = [];
  placementForm: FormGroup;
  recordMatch = false;
  matchSR = 0;
  leaver = false;
  
  constructor() { }

  ngOnInit() { 
    this.mapNames = Object.keys(this.maps);
    this.initForm();
    if(this.payload.data) {
      this.fillInData();
    }
  }
  
  initForm() {
    this.placementForm = new FormGroup({
      map: new FormControl('', [Validators.required]),
      outcome: new FormControl('', [Validators.required]),
      sr: new FormControl({value: '', disabled: true}, [Validators.required, Validators.pattern('[0-9]+')])
    });
  }

  fillInData() {
    let data = this.payload.data;
    let formValue = {
      map: (data.map != undefined) ? data.map : '',
      outcome: (data.outcome != undefined) ? data.outcome : '',
      sr: (data.sr != undefined) ? data.sr : ''
    };
    this.leaver = (data.leaver != undefined) ? data.leaver : false;
    this.placementForm.setValue(formValue);
  }

  onGroupAdd(input) {
    if(input.value != "" && this.group.length < 5 && !this.group.includes(input.value)) {
      this.group.push(input.value);
    }
  }

  onGroupRemove(name) {
    if(this.group.includes(name)) {
      this.group.splice(this.group.indexOf(name), 1);
    }
  }

  toggleSR() {
    if(this.recordMatch) {
      this.placementForm.controls.sr.disable();
      this.recordMatch = false;
    } else {
      this.placementForm.controls.sr.enable();
      this.recordMatch = true;
    }
  }

  submitForm() {
    let result = this.placementForm.value;
    let gameData = {
      type: 'Placement',
      data: {
        map: result.map,
        outcome: result.outcome,
        leaver: this.leaver
      },
      group: this.group
    };
    this.onSubmit.emit(gameData);

    if(this.recordMatch) {
      let matchData = Object.assign({}, gameData);
      matchData.data = Object.assign({}, gameData.data);
      matchData.type = "Match";
      matchData.data["sr"] = result.sr;
      this.onSubmit.emit(matchData);
    }
  }
}
