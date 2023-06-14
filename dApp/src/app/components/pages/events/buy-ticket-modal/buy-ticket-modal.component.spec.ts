import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyTicketModalComponent } from './buy-ticket-modal.component';

describe('BuyTicketModalComponent', () => {
  let component: BuyTicketModalComponent;
  let fixture: ComponentFixture<BuyTicketModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyTicketModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuyTicketModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
