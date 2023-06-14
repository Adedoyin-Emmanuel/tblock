import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Web3Service } from 'src/app/services/web3.service';

@Component({
  selector: 'app-home-demo-one',
  templateUrl: './home-demo-one.component.html',
  styleUrls: ['./home-demo-one.component.scss']
})
export class HomeDemoOneComponent implements OnInit {

  walletConnected = false
  constructor(
    private w3s: Web3Service,
    private spinner: NgxSpinnerService
  ){
    
  }



async ngOnInit() {
    
  this.w3s.account$.subscribe(()=>{
    this.walletConnected = this.w3s.account && this.w3s.account.length > 1;
  })
    // setTimeout(async ()=>{
    //     this.walletConnected = this.w3s.account && this.w3s.account.length > 1;
    // },500)
    
}

}
