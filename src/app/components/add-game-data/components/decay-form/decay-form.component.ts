import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-decay-form',
  templateUrl: './decay-form.component.html',
  styleUrls: ['./decay-form.component.css']
})
export class DecayFormComponent implements OnInit {
  @Input() payload;
  @Output() onSubmit = new EventEmitter();
  decayForm: FormGroup;
  
  constructor() { }

  ngOnInit() {
    this.initForm();
    if(this.payload.data) {
      this.fillInData();
    }
  }

  initForm() {
    this.decayForm = new FormGroup({
      sr: new FormControl('', [Validators.required, Validators.pattern("[0-9]+")])
    });
  }

  fillInData() {
    let data = this.payload.data;
    let formValue = {
      sr: (data.sr != undefined) ? data.sr : ''
    };
    this.decayForm.setValue(formValue);
  }

  submitForm() {
     let response = this.decayForm.value;
     let gameData =  {
      type: "Decay",
      data: {
        sr: response.sr
      }
    };
    this.onSubmit.emit(gameData);
  }
}