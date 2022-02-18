import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Home1155Component } from './home1155.component';

describe('Home1155Component', () => {
  let component: Home1155Component;
  let fixture: ComponentFixture<Home1155Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Home1155Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Home1155Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
