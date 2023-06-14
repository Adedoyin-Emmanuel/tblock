import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTicketCategoryModalComponent } from './add-ticket-category-modal.component';

describe('AddTicketCategoryModalComponent', () => {
  let component: AddTicketCategoryModalComponent;
  let fixture: ComponentFixture<AddTicketCategoryModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTicketCategoryModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTicketCategoryModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
