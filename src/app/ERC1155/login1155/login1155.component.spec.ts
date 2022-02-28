import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Login1155Component } from './login1155.component';

describe('Login1155Component', () => {
  let component: Login1155Component;
  let fixture: ComponentFixture<Login1155Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Login1155Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Login1155Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
