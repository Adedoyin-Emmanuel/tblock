import { ComponentFixture, TestBed } from '@angular/core/testing';

import { W3MCoreButtonComponentWrapperComponent } from './w3-mcore-button-component-wrapper.component';

describe('W3MCoreButtonComponentWrapperComponent', () => {
  let component: W3MCoreButtonComponentWrapperComponent;
  let fixture: ComponentFixture<W3MCoreButtonComponentWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ W3MCoreButtonComponentWrapperComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(W3MCoreButtonComponentWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
