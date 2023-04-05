import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuiviPage } from './suivi.page';

describe('SuiviPage', () => {
  let component: SuiviPage;
  let fixture: ComponentFixture<SuiviPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuiviPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuiviPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
