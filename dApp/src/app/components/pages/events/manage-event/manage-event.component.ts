import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { getWalletClient, getPublicClient, fetchTransaction } from '@wagmi/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { delay } from 'rxjs';
import { Events } from 'src/app/models/events';
import { AppToastService } from 'src/app/services/app-toast.service';
import { EventsService } from 'src/app/services/events.service';
import { Web3Service } from 'src/app/services/web3.service';
import { environment } from 'src/environments/environment';
import { BaseError, ContractFunctionRevertedError, parseGwei, zeroAddress } from 'viem';
import { AddTicketCategoryModalComponent } from '../add-ticket-category-modal/add-ticket-category-modal.component';
const SeatAssignerABI = require( "src/assets/abis/seat-assigner.json");

@Component({
  selector: 'app-manage-event',
  templateUrl: './manage-event.component.html',
  styleUrls: ['./manage-event.component.scss']
})
export class ManageEventComponent {

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
    private modalService: NgbModal,
    private spinner: NgxSpinnerService,
    private toastService: AppToastService,
    private router: Router) { }

  async ngOnInit() {
      this.singleItemDetail = this.eventsService.get();
      this.history = this.eventsService.getHistory();

      this.route.params.subscribe(async (params: Params) => {
      
        this.id = params['id'];
        
        this.event = await this.eventService.getEvent(this.id)
        
        this.ticketTypes = await this.eventService.getTicketTypes(this.event?.address!)
      })
  
      
  
  
    this.titleService.setTitle('Manage your Event | TicketBlock');
  }


  async addTicketType(){
    const modalRef = this.modalService.open(AddTicketCategoryModalComponent);
		modalRef.componentInstance.event = this.event;   

    modalRef.closed.subscribe(async ()=>{
      // const result = await modalRef.result
      // this.router.navigate(['/manage/event', this.event?.id]);
      window.location.reload(); 
    })
    
  }


  async assignSeats(ticketType: any){
    if(true || confirm('Are you sure?')){
      this.spinner.show();    

      try{
        const walletClient  = await getWalletClient({
          chainId: this.w3s.chainId
        })
        // const walletClient = createWalletClient({
        //   chain: mainnet,
        //   transport: custom(window.ethereum)
        // })
        const publicClient = await getPublicClient({
          chainId: this.w3s.chainId
        })
        const [address] = await walletClient!.getAddresses()
        
        //@ts-ignore
        const { request } = await publicClient.simulateContract({
          abi: SeatAssignerABI,
          address: environment.seatAsigner as `0x${string}`,
          functionName: 'assignSeats',
          //@ts-ignore
          account: address,
          args: [
            this.event.address,
            ticketType.id.toString()
          ],
          //@ts-ignore
          // maxFeePerGas: parseGwei('200'), 
          // chain: this.w3s.chainId
        })

        // // const filter = await publicClient.createEventFilter({ 
        // //   address: environment.eventManagerAddress as `0x${string}`,
        // //   event: parseAbiItem('event RequestSent(requestId, numWords)'),
        // //   fromBlock: 'latest'
        // // })

        //@ts-ignore
        const hash = await walletClient!.writeContract({
          abi: SeatAssignerABI,
          address: environment.seatAsigner as `0x${string}`,
          functionName: 'assignSeats',
          //@ts-ignore
          account: address,
          args: [
            this.event.address,
            ticketType.id.toString()
          ],
          // maxFeePerGas: parseGwei('200'), 
          // gas: 1,
          // gasPrice: 1
          // chain: this.w3s.chainId
        })

        await publicClient.waitForTransactionReceipt( 
          { hash: hash }
        )

        await delay(3000);
        const transaction = await fetchTransaction({
          hash,

        })

        this.toastService.show('Success', 'Seats are being Assigned, check back in 5 minutes!')
        this.spinner.hide();
        //redirect
      }catch(err){
        this.toastService.show('Error', 'Seat Assignemt Failed!', 4000, 'error')
        console.error(err)
        this.spinner.hide();

        // if (err instanceof BaseError) {
          
        //   // Option 1: checking the instance of the error
        //   if (err.cause instanceof ContractFunctionRevertedError) {
        //     const cause: ContractFunctionRevertedError = err.cause;
        //     const errorName = cause.data?.errorName ?? "";
        //     // do something with `errorName`
        //   }
        
        //   // Option 2: using `walk` method from `BaseError`
        //   const revertError = err.walk(err => err instanceof ContractFunctionRevertedError)
        //   if (revertError) {
        //     const errorName = revertError.data?.errorName ?? "";
        //     // do something with `errorName`
        //   }
        // }

      }
    }

  }

  seatsBeingViewed : any|undefined
  async viewSeats(ticketType: any){
    this.seatsBeingViewed= {
      ticketType,
      seatAssignments: ticketType.seatAssignments
    }

  }
}
