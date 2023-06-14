import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Router } from '@angular/router';
import { EventsListService } from 'src/app/services/events-list.service';
import { Title } from '@angular/platform-browser';
import { EventsService } from 'src/app/services/events.service';

@Component({
    selector: 'app-trending-nfts',
    templateUrl: './trending-nfts.component.html',
    styleUrls: ['./trending-nfts.component.scss']
})
export class TrendingNftsComponent implements OnInit {

	eventList: any|undefined;

    constructor(
        public router: Router,
		private eventService: EventsService,
		private title: Title
    ) { }

    async ngOnInit() {
		this.title.setTitle('Ticket-Block');
		this.eventList = await this.eventService.getEvents();
	}

    trendingSlides: OwlOptions = {
		nav: true,
		loop: true,
		margin: 25,
		dots: false,
		autoplay: false,
		smartSpeed: 500,
		autoplayHoverPause: true,
		navText: [
			"<i class='ri-arrow-left-s-line'></i>",
			"<i class='ri-arrow-right-s-line'></i>"
		],
		responsive: {
			0: {
				items: 1
			},
			515: {
				items: 1
			},
			695: {
				items: 2
			},
			935: {
				items: 3
			},
			1200: {
				items: 4
			}
		}
    }

}