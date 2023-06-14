import { TestBed } from '@angular/core/testing';

import { EventsListService } from './events-list.service';

describe('EventsListService', () => {
  let service: EventsListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventsListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
