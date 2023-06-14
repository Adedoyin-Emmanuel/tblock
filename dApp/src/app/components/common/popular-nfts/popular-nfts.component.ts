import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventsListService } from 'src/app/services/events-list.service';

@Component({
    selector: 'app-popular-nfts',
    templateUrl: './popular-nfts.component.html',
    styleUrls: ['./popular-nfts.component.scss']
})
export class PopularNftsComponent implements OnInit {

    popularEvent: any;

    constructor(
        public router: Router,
        private eventService: EventsListService
    ) { }

    ngOnInit(): void {
        this.popularEvent = this.eventService.get();
    }

}