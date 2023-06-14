import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { getWalletClient, getPublicClient, fetchTransaction, erc20ABI, getContract } from '@wagmi/core';
import { constants } from 'ethers';
import { formatUnits, parseEther } from 'ethers/lib/utils';
import { get } from 'lodash';
import { NgxSpinnerService } from 'ngx-spinner';
import { async, Subscription } from 'rxjs';
import { Events } from 'src/app/models/events';
import { AppToastService } from 'src/app/services/app-toast.service';
import { EventsService } from 'src/app/services/events.service';
import { Web3Service } from 'src/app/services/web3.service';
import { delay } from 'src/app/utils/delay';
import { environment } from 'src/environments/environment';
import { zeroAddress, parseAbiItem, parseAbi } from 'viem';
import { TicketCurrencies } from '../ticket-currencies';
const EventABI = require( "../../../../../assets/abis/event.json");

@Component({
  selector: 'app-buy-ticket-modal',
  templateUrl: './buy-ticket-modal.component.html',
  styleUrls: ['./buy-ticket-modal.component.scss']
})
export class BuyTicketModalComponent {
  @Input() event: Events|undefined;
  @Input() ticketType: any|undefined;
  form: FormGroup|undefined=undefined;
  formSubscriptions: Subscription[]=[];

  validationMessages : {
    [index: string]: any
   } = {
     'slippageTolerance' : {
       'required'  :   'Slippage is Required.',
       'min' :   'Slippage must be greater than 0',
       'max' :   'Slippage must be lesser than 50'
     }  
 
   };

   formatUnits = formatUnits
   

  constructor(
    private fb: FormBuilder,
    public toastService: AppToastService,
    public activeModal: NgbActiveModal,
    private w3s: Web3Service,
    private spinner: NgxSpinnerService,
    public eventService: EventsService
  ){
    
  }

  

  async ngOnInit(){

    this.form = this.fb.group({
      
    })

    
  }

  get f() { return this.form!.controls; }

  currencyName(add: string){
    return TicketCurrencies.find(ff=>ff.address==add)?.currency??''
  }

  get ticketPricesFormArray() {
    return this.form!.get('ticketPrices') as FormArray;
  }


  async buyTicket(price: any){

    this.spinner.show();  


    try{

      this.eventService.generateAndSubmitTicketMetadata(this.event!, this.ticketType.id, this.ticketType.name, this.ticketType.logo).subscribe((async (response: any) =>{
        const metadataUrl = `${environment.apiUrl}tickets/metadata/${response.id}`
        console.log('metadataUrl: ',metadataUrl)

        const walletClient  = await getWalletClient({
          chainId: this.w3s.chainId
        })
        const publicClient = await getPublicClient({
          chainId: this.w3s.chainId
        })
        const [address] = await walletClient!.getAddresses()

        const tokenSaleContract = await getContract({
          address: price.currency as `0x{string}`,
          abi: erc20ABI
        })
        const allowance = await tokenSaleContract.read.allowance([address, this.event?.address as `0x{string}`] );
        console.log('allowance: ',allowance, ', price: ', parseEther( price.price.toString()).toBigInt() )
        if( allowance <  parseEther( price.price.toString()).toBigInt()){
          const { request: approveRequest } = await publicClient.simulateContract({
            // abi: parseAbi(['function addTicketCategory(string name, string logo, uint32 maxTickets, (uint256 price, address currency)[4], bool requiresNFT, address nftAddress, (string name, string value)[4])']), // EventABI,
            abi: erc20ABI,
            address:  price.currency as `0x${string}`,
            functionName: 'approve',
            //@ts-ignore
            account: address,
            args: [
              this.event?.address as `0x${string}`, 
              parseEther( price.price.toString()).toBigInt()
            ],
            // chain: this.w3s.chainId
          })
  
          const approveHash = await walletClient!.writeContract(approveRequest)
  
          await publicClient.waitForTransactionReceipt( 
            { hash: approveHash }
          )
  
          await delay(5000);
        }
        

        
  
        // const apprTransaction = await fetchTransaction({
        //   hash: approveHash,
  
        // })
        
        
        // @ts-ignore
        const { request } = await publicClient.simulateContract({
          // abi: parseAbi(['function addTicketCategory(string name, string logo, uint32 maxTickets, (uint256 price, address currency)[4], bool requiresNFT, address nftAddress, (string name, string value)[4])']), // EventABI,
          abi: EventABI,
          address: this.event?.address as `0x${string}`,
          functionName: 'buyTicket',
          //@ts-ignore
          account: address,
          args: [
            this.ticketType.id, 
            1,
            price.currency,
            metadataUrl
          ],
          // chain: this.w3s.chainId
        })
  
        
  
        // const filter = await publicClient.createEventFilter({ 
        //   address: this.event?.address as `0x${string}`,
        //   event: parseAbiItem('event NewTicket(uint256 eventId, uint256 ticketCategoryId, address buyer, uint[] mintedTokens)'),
        //   fromBlock: 'latest'
        // })
  
        const hash = await walletClient!.writeContract(request)
  
        await publicClient.waitForTransactionReceipt( 
          { hash: hash }
        )

        const transaction = await fetchTransaction({
          hash,
  
        })
        
        // const logs = await publicClient.getFilterLogs({ filter })
  
        // console.log('event log:', logs)
  
        // // @ts-ignore
        // console.log('Cat Id:', logs[0]['args']['id'])
        // // @ts-ignore
        // const catId = logs[0]['args']['id'];
        // this.router.navigate(['/manage/event', eventIndex]);
  
        this.spinner.hide();
  
        this.toastService.show('Congratulations!', 'Your Ticket has been minted and sent to your wallet!', 5000)
  
  
        this.activeModal.close();
      }), (err)=>{
        console.error(err)
        this.spinner.hide();
        this.toastService.show('Error!', 'Ticket Sale Was not successful', 5000)
        this.activeModal.dismiss();
      })

      
    }catch(err){
      console.error(err)
      this.spinner.hide();
      this.toastService.show('Error!', 'Ticket Sale Was not successful', 5000)
      this.activeModal.dismiss();
    }
  }

  objectKeys(o: any){
    
    if(!o){
      return []
    }
    return Object.keys(o)
  }
}
