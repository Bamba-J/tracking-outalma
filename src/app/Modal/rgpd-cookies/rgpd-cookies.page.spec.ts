import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RgpdCookiesPage } from './rgpd-cookies.page';

describe('RgpdCookiesPage', () => {
  let component: RgpdCookiesPage;
  let fixture: ComponentFixture<RgpdCookiesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RgpdCookiesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RgpdCookiesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
