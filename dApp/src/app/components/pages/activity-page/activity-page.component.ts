import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Events } from 'src/app/models/events';
import { AppToastService } from 'src/app/services/app-toast.service';
import { EventsListService } from 'src/app/services/events-list.service';
import { EventsService } from 'src/app/services/events.service';
import { Web3Service } from 'src/app/services/web3.service';

@Component({
    selector: 'app-activity-page',
    templateUrl: './activity-page.component.html',
    styleUrls: ['./activity-page.component.scss']
})
export class ActivityPageComponent implements OnInit {

    recentList: any;

    pagingConfig = {
        currentPage: Number,
        items: Number,
        totalItem: Number
    }

    tickets: {
        eventId: any;
        tokenId: any;
        tokenUri: unknown[];
        organizer: string;
        date: any;
        eventAddress: string | undefined;
        name: string;
        image: string;
        description: string | undefined;
        attributes: {
            trait_type: string;
            value: string | undefined;
        }[];
    }[]=[]

    ownEvents: (Events )[]=[]

    
    constructor(
        
        public toastService: AppToastService,
        
        private w3s: Web3Service,
        private spinner: NgxSpinnerService,
        public eventService: EventsService,
        private eventListService: EventsListService
      ){
        
      }

   

    async ngOnInit() {
        this.recentList = this.eventListService

        setTimeout(async ()=>{
            this.tickets = await this.eventService.getOwnedTickets();

            

            this.ownEvents = await this.eventService.getOwnersEvents();
            console.log('ownEvents::' , this.ownEvents)
        },500)
        
    }

}