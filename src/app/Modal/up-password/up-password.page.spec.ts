import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpPasswordPage } from './up-password.page';

describe('UpPasswordPage', () => {
  let component: UpPasswordPage;
  let fixture: ComponentFixture<UpPasswordPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpPasswordPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpPasswordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
