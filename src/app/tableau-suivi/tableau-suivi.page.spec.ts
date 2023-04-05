import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableauSuiviPage } from './tableau-suivi.page';

describe('TableauSuiviPage', () => {
  let component: TableauSuiviPage;
  let fixture: ComponentFixture<TableauSuiviPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableauSuiviPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableauSuiviPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
