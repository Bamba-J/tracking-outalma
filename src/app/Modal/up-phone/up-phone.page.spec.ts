import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpPhonePage } from './up-phone.page';

describe('UpPhonePage', () => {
  let component: UpPhonePage;
  let fixture: ComponentFixture<UpPhonePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpPhonePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpPhonePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
