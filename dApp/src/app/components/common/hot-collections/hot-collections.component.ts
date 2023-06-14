import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventsListService } from 'src/app/services/events-list.service';

@Component({
  selector: 'app-hot-collections',
  templateUrl: './hot-collections.component.html',
  styleUrls: ['./hot-collections.component.scss']
})
export class HotCollectionsComponent implements OnInit {
hotCollection: any;

  constructor(
    private router: Router,
    private eventService: EventsListService
  ) { }

  ngOnInit(): void {
    this.hotCollection = this.eventService.get();
  }

}
