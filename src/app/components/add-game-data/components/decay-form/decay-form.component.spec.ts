import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecayFormComponent } from './decay-form.component';

describe('DecayFormComponent', () => {
  let component: DecayFormComponent;
  let fixture: ComponentFixture<DecayFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecayFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecayFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
