import { TestBed } from '@angular/core/testing';

import { MyTicketsListService } from './my-tickets-list.service';

describe('MyTicketsListService', () => {
  let service: MyTicketsListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyTicketsListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
