import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Form3Page } from './form3.page';

describe('Form3Page', () => {
  let component: Form3Page;
  let fixture: ComponentFixture<Form3Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Form3Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Form3Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
