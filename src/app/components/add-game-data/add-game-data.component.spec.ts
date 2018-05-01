import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGameDataComponent } from './add-game-data.component';

describe('AddGameDataComponent', () => {
  let component: AddGameDataComponent;
  let fixture: ComponentFixture<AddGameDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddGameDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddGameDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
