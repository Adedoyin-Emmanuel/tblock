import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ethers, utils } from 'ethers';
import { id } from 'ethers/lib/utils';
import { NgxSpinnerService } from 'ngx-spinner';
import { EventsService } from 'src/app/services/events.service';
import { MyTicketsListService } from 'src/app/services/my-tickets-list.service';
import { Web3Service } from 'src/app/services/web3.service';

@Component({
  selector: 'app-my-tickets',
  templateUrl: './my-tickets.component.html',
  styleUrls: ['./my-tickets.component.scss'],

})
export class MyTicketsComponent implements OnInit{

    ticketlist: any;
    page: number = 1;
    count: number = 0;
    tableSize: number = 8;
    tableSizes:  any = [3, 6, 9, 12];

    nftAddress: any;
	tokenId: any;
	price: any;
    id: any;


    constructor(
        private mytickets: MyTicketsListService,
        private titleService: Title,
        public w3s: Web3Service,
        public ticketsService: MyTicketsListService,
        private route: ActivatedRoute,
        private router: Router,
        private modalService: NgbModal,
        private spinner: NgxSpinnerService) { }

    ngOnInit() {
        this.fetchPosts();
        this.ticketlist = this.mytickets.get();

        this.route.params.subscribe(async (params: Params) => {

            this.id = params['id'];
            this.nftAddress = await this.ticketsService.getTickets(this.nftAddress)

            this.tokenId = await this.ticketsService.getTickets(this.tokenId)

            this.price = await this.ticketsService.getTickets(this.price)
        })

    }
    fetchPosts() {
        this.mytickets.get()
    }

    onTableChange(event: any) {
        this.page = event;
        this.fetchPosts();
    }
    onTableChangeSize(event: any) {
        this.tableSize = event.target.value;
        this.page = 1;
        this.fetchPosts();
    }



}
