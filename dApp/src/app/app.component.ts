import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router, NavigationCancel, NavigationEnd } from '@angular/router';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { filter } from 'rxjs/operators';
import { Web3Service } from './services/web3.service';
import { Title } from '@angular/platform-browser';
import { readContract } from '@wagmi/core';
declare let $: any;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    providers: [
        Location, {
            provide: LocationStrategy,
            useClass: PathLocationStrategy
        }
    ]
})
export class AppComponent {
    location: any;
    routerSubscription: any;

    Title = 'Ticket Block'

    onSupportedNetwork = true
    

    constructor(
        private router: Router,
        public w3s: Web3Service
    ) {}

    ngOnInit(){
        this.recallJsFuntions();

        // setTimeout(()=>{
        //     // console.log('Chain:',this.w3s.chainId ,' , acct:', this.w3s.account)

        //     this.onSupportedNetwork= !!this.w3s.chainId ||  this.w3s.chains.some(ff=>ff.id==this.w3s.chainId)

        //     if(this.onSupportedNetwork){
        //         alert("You are not connected to Theta Testnet or hardhat, please switch your wallet to Theta Testnet to continue!")
        //     }
        //     // if(this.w3s.chainId && this.w3s.account && this.w3s.chainId!= 365){
        //     //     this.onSupportedNetwork= !this.w3s.chains.some(ff=>ff.id==this.w3s.chainId)
        //     //     // alert("You are not connected to Theta Testnet, please switch your wallet to Theta Testnet to continue!")
        //     //     // this.onSupportedNetwork=false;
        //     // }
        // },2000)

        // const abi = [
        //     {
        //       "inputs": [],
        //       "name": "readMessage",
        //       "outputs": [
        //         {
        //           "internalType": "string",
        //           "name": "",
        //           "type": "string"
        //         },
        //         {
        //           "internalType": "string",
        //           "name": "",
        //           "type": "string"
        //         }
        //       ],
        //       "stateMutability": "view",
        //       "type": "function"
        //     },
        //     {
        //       "inputs": [
        //         {
        //           "internalType": "string",
        //           "name": "_subject",
        //           "type": "string"
        //         },
        //         {
        //           "internalType": "string",
        //           "name": "_message",
        //           "type": "string"
        //         }
        //       ],
        //       "name": "updateMessage",
        //       "outputs": [],
        //       "stateMutability": "nonpayable",
        //       "type": "function"
        //     }
        //   ]

        // setTimeout(async ()=>{
        //     const data = await readContract ({
        //         address: '0x9A676e781A523b5d0C0e43731313A708CB607508',
        //         abi: abi,
        //         functionName: "readMessage",
        //         args: []
        //       })
        //       console.log( 'MSG: ',data)
        // },100)  
    }

    recallJsFuntions() {
        this.routerSubscription = this.router.events
        .pipe(filter(event => event instanceof NavigationEnd || event instanceof NavigationCancel))
        .subscribe(event => {
            this.location = this.router.url;
            if (!(event instanceof NavigationEnd)) {
                return;
            }
            window.scrollTo(0, 0);
        });
    }
}