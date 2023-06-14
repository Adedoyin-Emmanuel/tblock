import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppToastService } from 'src/app/services/app-toast.service';
import { EventsListService } from 'src/app/services/events-list.service';
import { EventsService } from 'src/app/services/events.service';
import { Web3Service } from 'src/app/services/web3.service';

@Component({
  selector: 'app-ticket-details',
  templateUrl: './ticket-details.component.html',
  styleUrls: ['./ticket-details.component.scss']
})
export class TicketDetailsComponent {

  id: number|undefined;
  eventId: number|undefined;

  ticket: any;
  event: any;
  ticketTypes: any;

  url: string|undefined;
  
  constructor(
        
    public toastService: AppToastService,
    private route: ActivatedRoute,
    private router: Router,
    private w3s: Web3Service,
    private spinner: NgxSpinnerService,
    public eventService: EventsService
  ){
    
  }



  async ngOnInit() {
      
    this.route.params.subscribe(async (params: Params) => {
      
      this.id = params['id'];
      this.eventId = params['eventId'];
      
      setTimeout(async ()=>{
        this.ticket = await this.eventService.getTicket(this.eventId, this.id!);
        this.event=this.ticket.event;
        this.ticketTypes = await this.eventService.getTicketTypes(this.event?.address!)
        console.log('ownEvents::' , this.ticket)
    },500)
    })

    this.url = this.router.url;


      
      
  }
}
