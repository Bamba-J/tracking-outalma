import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MsgSavEmployePage } from './msg-sav-employe.page';

describe('MsgSavEmployePage', () => {
  let component: MsgSavEmployePage;
  let fixture: ComponentFixture<MsgSavEmployePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MsgSavEmployePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MsgSavEmployePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
