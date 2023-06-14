import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { getWalletClient, getPublicClient, erc20ABI, fetchTransaction } from '@wagmi/core';
import { parseEther } from 'ethers/lib/utils';
import { NgxSpinnerService } from 'ngx-spinner';
import { delay } from 'rxjs';
import { AppToastService } from 'src/app/services/app-toast.service';
import { EventsService } from 'src/app/services/events.service';
import { Web3Service } from 'src/app/services/web3.service';
import { environment } from 'src/environments/environment';
import { getContract,  parseAbiItem } from 'viem';
import { TicketCurrencies } from '../ticket-currencies';
const FaucetABI = require( "../../../../../assets/abis/faucet.json");
const faucetAddress = environment.faucetAddress

@Component({
  selector: 'app-faucet',
  templateUrl: './faucet.component.html',
  styleUrls: ['./faucet.component.scss']
})
export class FaucetComponent {
  form: FormGroup|undefined=undefined;

  ticketCurrencies = TicketCurrencies

  message = ''
  
  constructor(
    private fb: FormBuilder,
    public toastService: AppToastService,
    
    private w3s: Web3Service,
    private spinner: NgxSpinnerService,
    public eventService: EventsService
  ){
    
  }

  async ngOnInit(){

    this.form = this.fb.group({
      currency: new FormControl(TicketCurrencies[0].address, [Validators.required]),
      amount: [10, [Validators.required, Validators.min(1), Validators.max(100)]]
    })

    
  }

  get f() { return this.form!.controls; }

  async onSubmit(){

    this.spinner.show();  
    this.message=''


    try{

      const walletClient  = await getWalletClient({
        chainId: this.w3s.chainId
      })
      const publicClient = await getPublicClient({
        chainId: this.w3s.chainId
      })
      const [address] = await walletClient!.getAddresses()

      
      const { request } = await publicClient.simulateContract({
        // abi: parseAbi(['function addTicketCategory(string name, string logo, uint32 maxTickets, (uint256 price, address currency)[4], bool requiresNFT, address nftAddress, (string name, string value)[4])']), // EventABI,
        abi: FaucetABI,
        address:  faucetAddress as `0x${string}`,
        functionName: 'withdraw',        
        
        args: [
          this.f.currency.value as `0x${string}`, 
          parseEther( this.f.amount.value.toString()).toBigInt()
        ],
        //@ts-ignore
        account: address,
        // chain: this.w3s.chainId
      })

      const hash = await walletClient!.writeContract(request)

      await publicClient.waitForTransactionReceipt( 
        { hash }
      )

      await delay(5000);

      

      

      // const filter = await publicClient.createEventFilter({ 
      //   address: faucetAddress as `0x${string}`,
      //   event: parseAbiItem('event Withdrawn(address withdrawer, uint amount)'),
      //   fromBlock: 'latest'
      // })

            
      // const logs = await publicClient.getFilterLogs({ filter })

      //// console.log('event log:', logs)

      //// // @ts-ignore
      //// console.log('Cat Id:', logs[0]['args']['id'])
      //// // @ts-ignore
      //// const catId = logs[0]['args']['id'];
      

      this.spinner.hide();

      this.toastService.show('Congratulations!', 'Your Coins have been sent to your wallet!', 5000)

      this.message= "Your Coins have been sent to your wallet! Coin Address: " + this.f.currency.value

      

      
    }catch(err){
      console.error(err)
      this.spinner.hide();
      this.toastService.show('Error!', 'Claim Was not successful', 5000)
      
    }
  }
}
