import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturePDFPage } from './facture-pdf.page';

describe('FacturePDFPage', () => {
  let component: FacturePDFPage;
  let fixture: ComponentFixture<FacturePDFPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacturePDFPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacturePDFPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
