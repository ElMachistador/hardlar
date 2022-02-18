import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Marketplace1155Component } from './marketplace1155.component';

describe('Marketplace1155Component', () => {
  let component: Marketplace1155Component;
  let fixture: ComponentFixture<Marketplace1155Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Marketplace1155Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Marketplace1155Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
