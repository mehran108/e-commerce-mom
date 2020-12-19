/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SliderFormComponent } from './slider-form.component';

describe('SliderFormComponent', () => {
  let component: SliderFormComponent;
  let fixture: ComponentFixture<SliderFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SliderFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SliderFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
