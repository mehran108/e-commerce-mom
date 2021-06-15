/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EngineFormComponent } from './engine-form.component';

describe('EngineFormComponent', () => {
  let component: EngineFormComponent;
  let fixture: ComponentFixture<EngineFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EngineFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EngineFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
