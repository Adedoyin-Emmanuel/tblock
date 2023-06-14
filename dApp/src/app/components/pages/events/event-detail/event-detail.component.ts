
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { EventsService } from 'src/app/services/events.service';
import { Web3Service } from 'src/app/services/web3.service';
import { Events } from 'src/app/models/events';
import { getWalletClient, getPublicClient, fetchTransaction, fetchToken } from '@wagmi/core';
import { parseEther, parseAbiItem } from 'viem';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BuyTicketModalComponent } from '../buy-ticket-modal/buy-ticket-modal.component';
const EventABI = require( "../../../../../assets/abis/event.json");

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss']
})
export class EventDetailComponent {

  singleItemDetail: any;
  history: any;

  id: any;
  event: Events|undefined;
  ticketTypes: any|undefined;

  

  constructor(private eventsService: EventsService,
    private titleService: Title, 
    public w3s: Web3Service,
    public eventService: EventsService,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal,
    private spinner: NgxSpinnerService) { }

  async ngOnInit() {
      this.singleItemDetail = this.eventsService.get();
      this.history = this.eventsService.getHistory();

      this.route.params.subscribe(async (params: Params) => {
      
        this.id = params['id'];
        
        this.event = await this.eventService.getEvent(this.id)
        
        this.ticketTypes = await this.eventService.getTicketTypes(this.event?.address!)

        this.titleService.setTitle(`Register & Buy Ticket for '${this.event?.name??""}' | TicketBlock`);

        for (let index = 0; index < this.ticketTypes.length; index++) {
          const tType = this.ticketTypes[index];
          if(tType.requiresNFT){
            tType.nftToken = await this.w3s.getERC721TokenInfo(tType.nftAddress)
          }
          
        }
        // const token = await this.w3s.getERC721TokenInfo('0xf20766dB3E1ab720C5c65E347c06f29B72C8f302')
        // console.log('token:', token)
        //this.web3StorageClient = new Web3Storage({ token: environment.web3StorageToken });
      })
  
  }

  async buyTicket(ticketType: any){

    const modalRef = this.modalService.open(BuyTicketModalComponent);
		modalRef.componentInstance.event = this.event; 
    modalRef.componentInstance.ticketType = ticketType;   

    modalRef.closed.subscribe(async ()=>{
      // const result = await modalRef.result
      // this.router.navigate(['/manage/event', this.event?.id]);
      window.location.reload(); 
    })

  }
}
