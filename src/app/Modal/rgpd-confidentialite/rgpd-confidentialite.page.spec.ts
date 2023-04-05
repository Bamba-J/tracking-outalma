import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RgpdConfidentialitePage } from './rgpd-confidentialite.page';

describe('RgpdConfidentialitePage', () => {
  let component: RgpdConfidentialitePage;
  let fixture: ComponentFixture<RgpdConfidentialitePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RgpdConfidentialitePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RgpdConfidentialitePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
