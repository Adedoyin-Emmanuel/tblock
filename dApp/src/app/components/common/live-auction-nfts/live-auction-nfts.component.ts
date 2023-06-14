import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Router } from '@angular/router';
import { EventsListService } from 'src/app/services/events-list.service';

@Component({
    selector: 'app-live-auction-nfts',
    templateUrl: './live-auction-nfts.component.html',
    styleUrls: ['./live-auction-nfts.component.scss']
})
export class LiveAuctionNftsComponent implements OnInit {

	events: any;

    constructor(
        public router: Router,
		private evetsService: EventsListService
	) { }

    ngOnInit(): void {
		this.events = this.evetsService.get();
	}

    auctionSlides: OwlOptions = {
		nav: false,
		loop: true,
		margin: 25,
		dots: true,
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
			576: {
				items: 1
			},
			695: {
				items: 2
			},
			895: {
				items: 3
			},
			1200: {
				items: 4
			}
		}
    }

}