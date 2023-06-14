import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { fetchTransaction, getPublicClient, getWalletClient } from '@wagmi/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppToastService } from 'src/app/services/app-toast.service';
import { Web3Service } from 'src/app/services/web3.service';
import { delay } from 'src/app/utils/delay';
import { environment } from 'src/environments/environment';
import { EventManager__factory, Types } from 'src/typechain';
import { parseAbiItem, zeroAddress } from 'viem';
const EventManagerABI = require( "../../../../../assets/abis/event-manager.json");



@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss']
})
export class CreatePageComponent implements OnInit {

  mainFormGroup: FormGroup|undefined=undefined;

  
  ticketType: Array<any> = [
    {name: 'Nft', selected: false, value: 'nft'},
    {name: 'Crypto', selected: false, value: 'crypto'},
    {name: 'Fiat', selected: false, value: 'fiat'}
  ]
  eventType: Array<any> = [
    {name: 'In Person', selected: false, value: 'inperson'},
    {name: 'Virtual', selected: false, value: 'virtual'}
  ]


  constructor(private fb: FormBuilder,
    private w3s: Web3Service,
    private route: ActivatedRoute,
    private router: Router,
    private spinner: NgxSpinnerService,
    private toastService: AppToastService
    // private location: Location,
    ) { }

  ngOnInit(): void {
    this.mainFormGroup = this.fb.group({
      eventName: ['Consensus 2023', [Validators.required]],
      eventOrg: ['Your Organisation Name', [Validators.required]],
      eventDescription: ['The Biggest Blockchain expo yet', [Validators.required]],
      
      eventType: [0, [Validators.required]],//inperson
      startDate: ['06/05/2023 12:12', [Validators.required]],
      eventAddress: ['29, Aure, Addis Ababa, Ethiopia', [Validators.required]],
      eventBanner: ['https://picsum.photos/id/117/640/640', [Validators.required]],
      eventWeb: ['https://www.events.com/', [Validators.required]],
      email: ['email@email.com', [Validators.required]],
      maxCapacity: this.fb.control(50, [Validators.required]), // [50, [Validators.required]],
      nftName: ['EventNFT', [Validators.required]],
      nftSymbol: ['NFT', [Validators.required]],
      // eventTwitter: ['https://twitter.com/car', [Validators.required]],
      // eventDiscord: ['https://discord.com/car', [Validators.required]],
      // eventInst: ['https://instagram.com/car', [Validators.required]],
    })
  }

  onCheckboxChecked() {
    
  }

  
  // convenience getter for easy access to form fields
  get f() { return this.mainFormGroup!.controls; }

  async creatEvent() {
    
    
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
    
    // @ts-ignore
    const { request } = await publicClient.simulateContract({
      abi: EventManagerABI,
      address: environment.eventManagerAddress as `0x${string}`,
      functionName: 'createNewEvent',
      //@ts-ignore
      account: address,
      args: [this.f.nftName.value, this.f.nftSymbol.value, {
        date : Math.floor(Date.parse(this.f.startDate.value) / 1000) , 
        id:0,
        desc: this.f.eventDescription.value,
        email: this.f.email.value,
        eventType: this.f.eventType.value,
        logo: this.f.eventBanner.value,
        maxCapacity: this.f.maxCapacity.value,
        name: this.f.eventName.value,
        orgName: this.f.eventOrg.value,
        owner: zeroAddress,
        ticketsSold: 0,
        website: this.f.eventWeb.value
      }],
      // chain: this.w3s.chainId
    })

    // const filter = await publicClient.createEventFilter({ 
    //   address: environment.eventManagerAddress as `0x${string}`,
    //   event: parseAbiItem('event eventCreated(address indexed owner, uint256 indexed eventID)'),
    //   fromBlock: 'latest'
    // })

    const hash = await walletClient!.writeContract(request)

    await publicClient.waitForTransactionReceipt( 
      { hash: hash }
    )

    await delay(3000);
    const transaction = await fetchTransaction({
      hash,

    })

    
    // ...
    // const logs = await publicClient.getFilterLogs({ filter })

    // console.log('event log:', logs)

    // // @ts-ignore
    // console.log('event Id:', logs[0]['args']['eventID'])
    // @ts-ignore
    // const eventIndex = logs[0]['args']['eventID'];
    this.toastService.show('Success', 'Event Created!')
    // this.router.navigate(['/event/manage', eventIndex]);

    this.router.navigate(['/']);
    //logs.find(ff=>ff.transactionHash==hash)
      // const eventMgrContract = EventManager__factory.connect(environment.eventManagerAddress, walletClient as any) // this.w3s.provider({chainId: 1 })
      // let tx = await eventMgrContract.createNewEvent(this.f.nftName.value, this.f.nftSymbol.value, {
      //   date : Math.floor(Date.parse(this.f.startDate.value) / 1000) , 
      //   id:0,
      //   desc: this.f.eventDescription.value,
      //   email: this.f.email.value,
      //   eventType: this.f.eventType.value,
      //   logo: this.f.eventBanner.value,
      //   maxCapacity: this.f.maxCapacity.value,
      //   name: this.f.eventName.value,
      //   orgName: this.f.eventOrg.value,
      //   owner: zeroAddress,
      //   ticketsSold: 0,
      //   website: this.f.eventWeb.value
      // })

      // const txResult = await tx.wait();

      this.spinner.hide();

      // const eventIndex = (txResult.events?.filter((f: any)=>f.event=='eventCreated')[0]?.args?.['eventID']).toString();

      // console.log('eventIndex: ', eventIndex)
      //redirect
    }catch(err){
      this.toastService.show('Error', 'Event Creation Failed!', 4000, 'error')
      console.error(err)
      this.spinner.hide();
    }

    
    

  }

  
}
