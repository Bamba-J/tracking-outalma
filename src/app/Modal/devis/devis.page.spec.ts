import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevisPage } from './devis.page';

describe('DevisPage', () => {
  let component: DevisPage;
  let fixture: ComponentFixture<DevisPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevisPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevisPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
