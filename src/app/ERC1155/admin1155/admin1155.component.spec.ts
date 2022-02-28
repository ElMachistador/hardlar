import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Admin1155Component } from './admin1155.component';

describe('Admin1155Component', () => {
  let component: Admin1155Component;
  let fixture: ComponentFixture<Admin1155Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Admin1155Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Admin1155Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
