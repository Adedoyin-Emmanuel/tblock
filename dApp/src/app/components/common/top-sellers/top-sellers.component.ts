import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { EventsListService } from 'src/app/services/events-list.service';

@Component({
    selector: 'app-top-sellers',
    templateUrl: './top-sellers.component.html',
    styleUrls: ['./top-sellers.component.scss']
})
export class TopSellersComponent implements OnInit {

    topEvent: any;

    constructor(
        private route: Router,
        private eventsService: EventsListService,
        public title: Title
    ) { }
    
    ngOnInit(): void {
        this.topEvent = this.eventsService.get();
    }

}