import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { getWalletClient, getPublicClient, fetchTransaction } from '@wagmi/core';
import { parseEther } from 'ethers/lib/utils';
import { get } from 'lodash';
import { NgxSpinnerService } from 'ngx-spinner';
import { async, Subscription } from 'rxjs';
import { Events } from 'src/app/models/events';
import { AppToastService } from 'src/app/services/app-toast.service';
import { Web3Service } from 'src/app/services/web3.service';
import { delay } from 'src/app/utils/delay';
import { environment } from 'src/environments/environment';
import { zeroAddress, parseAbiItem, parseAbi } from 'viem';
import { TicketCurrencies } from '../ticket-currencies';
const EventABI = require( "../../../../../assets/abis/event.json");

@Component({
  selector: 'app-add-ticket-category-modal',
  templateUrl: './add-ticket-category-modal.component.html',
  styleUrls: ['./add-ticket-category-modal.component.scss']
})
export class AddTicketCategoryModalComponent {
  @Input() event: Events|undefined;
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

  constructor(
    private fb: FormBuilder,
    public toastService: AppToastService,
    public activeModal: NgbActiveModal,
    private w3s: Web3Service,
    private spinner: NgxSpinnerService
  ){
    
  }

  ticketCurrencies = [
    {
      currency: 'USDT',
      address: '0x8642ddf9aD13985Ac19D312DcDf9F8BbdF234B59'
    },
    {
      currency: 'Theta',
      address: '0xbDC6957AaA9D87fa3FBbfdA31eE06D86DE697A8c'
    },
    {
      currency: 'TFuel',
      address: '0xA1eb070cBB288d7C21834254Efc0a84Ab27D6913'
    },
    {
      currency: 'USDC',
      address: '0xaEfB0aC8220Cb78860CF6a4bE2527BA595945bf0'
    }
  ]

  async ngOnInit(){

    this.form = this.fb.group({
      name: ['VIP', [Validators.required, Validators.maxLength(120)]],
      logo: ['https://picsum.photos/id/104/640/640', [Validators.required, Validators.maxLength(350)]],
      maxTickets: [10, [Validators.required, Validators.min(1),Validators.max(Number.MAX_SAFE_INTEGER)]],
      requiresNFT: [false, []],
      nftAddress: ['0x', [Validators.maxLength(60)]],
      ticketPrices: new FormArray([
        new FormGroup({
          amount: new FormControl(0, [Validators.required, Validators.min(0)]),
          currency: new FormControl(TicketCurrencies[0].currency, [Validators.required])
        })
      ],  {validators: Validators.required})
   
    })

    for (let i = 1; i < 4; i++) {
      const group = new FormGroup({
        amount: new FormControl(0, [Validators.required, Validators.min(0)]),
        currency: new FormControl(TicketCurrencies[i].currency, [Validators.required])
      });
  
      this.ticketPricesFormArray.push(group);
      
    }

    this.onFormChanges();


  }

  onFormChanges(): void {
    
    


  }

  get f() { return this.form!.controls; }

  get ticketPricesFormArray() {
    return this.form!.get('ticketPrices') as FormArray;
  }


  async onSubmit(frm: FormGroup){

    this.spinner.show();    

    try{
      const walletClient  = await getWalletClient({
        chainId: this.w3s.chainId
      })
      const publicClient = await getPublicClient({
        chainId: this.w3s.chainId
      })
      const [address] = await walletClient!.getAddresses()
      
      // @ts-ignore
      const { request } = await publicClient.simulateContract({
        // abi: parseAbi(['function addTicketCategory(string name, string logo, uint32 maxTickets, (uint256 price, address currency)[4], bool requiresNFT, address nftAddress, (string name, string value)[4])']), // EventABI,
        abi: EventABI,
        address: this.event?.address as `0x${string}`,
        functionName: 'addTicketCategory',
        //@ts-ignore
        account: address,
        args: [
          this.f.name.value, 
          this.f.logo.value,
          this.f.maxTickets.value,
          //@ts-ignore
          this.ticketPricesFormArray.controls.map((v,ix)=>{ 
            return [
              parseEther(this.ticketPricesFormArray.controls[ix].get('amount')?.value.toString()),
              TicketCurrencies[ix].address, //  this.ticketPricesFormArray.controls[ix].get('currency')?.value, 
              
            ]
            // return {
            //   currency: TicketCurrencies[ix].address, //  this.ticketPricesFormArray.controls[ix].get('currency')?.value, 
            //   amount: parseEther(this.ticketPricesFormArray.controls[ix].get('amount')?.value.toString())
            // }
          }),
          this.f.requiresNFT.value, 
          (this.f.requiresNFT.value === true)?  this.f.nftAddress.value: zeroAddress,
          [
            {name:'', value:''},
            {name:'', value:''},
            {name:'', value:''},
            {name:'', value:''}
          ] 
        ],
        // chain: this.w3s.chainId
      })

      

      // const filter = await publicClient.createEventFilter({ 
      //   address: this.event?.address as `0x${string}`,
      //   event: parseAbiItem('event NewTicketCategory(uint256 indexed eventId,uint256 indexed id,string name,string logo,uint32 ticketsSold,uint32 maxTickets,(uint256 price, address currency)[4] ticketPrices,bool requiresNFT,address nftAddress)'),
      //   fromBlock: 'latest'
      // })

      const hash = await walletClient!.writeContract(request)

      await publicClient.waitForTransactionReceipt( 
        { hash: hash }
      )
      
      const transaction = await fetchTransaction({
        hash,

      })
      
      await delay(3000);
      // ...
      // const logs = await publicClient.getFilterLogs({ filter })

      // console.log('event log:', logs)

      // // @ts-ignore
      // console.log('Cat Id:', logs[0]['args']['id'])
      // // @ts-ignore
      // const catId = logs[0]['args']['id'];
      // this.router.navigate(['/manage/event', eventIndex]);

      this.spinner.hide();

      this.toastService.show('Success!', 'Ticket Type Added', 5000)


      this.activeModal.close();
    }catch(err){
      console.error(err)
      this.spinner.hide();
      this.toastService.show('Error!', 'Ticket Type Was not added successfully', 5000)
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
