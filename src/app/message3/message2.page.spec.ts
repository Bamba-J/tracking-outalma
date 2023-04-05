import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Message2Page } from './message2.page';

describe('Message2Page', () => {
  let component: Message2Page;
  let fixture: ComponentFixture<Message2Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Message2Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Message2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
