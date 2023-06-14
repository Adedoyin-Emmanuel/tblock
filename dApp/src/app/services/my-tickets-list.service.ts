import { Injectable } from '@angular/core';
import { MyTicketsList } from '../models/my-tickets-list';
import { getContract, readContract } from '@wagmi/core';
import { Web3Service } from './web3.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
const EventManagerABI = require("../../assets/abis/event-manager.json");
const TicketsMarketABI = require("../../assets/abis/tickets-list.json");


@Injectable({
  providedIn: 'root'
})
export class MyTicketsListService {

  constructor(private web3s: Web3Service, private http: HttpClient) { }

  allTickets: Array<MyTicketsList> = ([
    {
        id: 0,
        nftaddress: '0x00we03e0rv90r90f90908f089f0',
        auctioned: false,
        nftname: 'Marts',
        owner: '0x1k289378j82j2729y27yw8y2ji9w82h8',
        nftimage: 'assets/images/Event2.jpg'
    },
    {
        id: 1,
        nftaddress: '0x00we03e0rv90r90f90908f089f0',
        auctioned: true,
        nftname: 'Cartes',
        owner: '0x1k289378j82j2729y27yw8y2ji9w82h8',
        nftimage: 'assets/images/Event2.jpg'
    },
    {
        id: 2,
        nftaddress: '0x00we0ee0rv90r90f90908f089f0',
        auctioned: false,
        nftname: 'Cat',
        owner: '0x1k289378j82j2729y27yw8y2ji9w82h8',
        nftimage: 'assets/images/Event2.jpg'
    },
    {
        id: 3,
        nftaddress: '0x00we03e0rv90r90f90908f089f0',
        auctioned: true,
        nftname: 'Monkey',
        owner: '0x1k289378j82j2729y27yw8y2ji9w82h8',
        nftimage: 'assets/images/Event2.jpg'
    },
    {
        id: 4,
        nftaddress: '0x00we03e0rv90r90f90908f089f0',
        auctioned: false,
        nftname: 'Marts',
        owner: '0x1k289378j82j2729y27yw8y2ji9w82h8',
        nftimage: 'assets/images/Event2.jpg'
    },
    {
        id: 5,
        nftaddress: '0x00we03e0rv90r90f90908f089f0',
        auctioned: true,
        nftname: 'Test',
        owner: '0x1k289378j82j2729y27yw8y2ji9w82h8',
        nftimage: 'assets/images/Event2.jpg'
    },
    {
        id: 6,
        nftaddress: '0x00we03e0rv90r90f90908f089f0',
        auctioned: false,
        nftname: 'Random',
        owner: '0x1k289378j82j2729y27yw8y2ji9w82h8',
        nftimage: 'assets/images/Event2.jpg'
    },
    {
        id: 7,
        nftaddress: '0x00we03e0rv90r90f90908f089f0',
        auctioned: true,
        nftname: 'Bananna',
        owner: '0x1k289378j82j2729y27yw8y2ji9w82h8',
        nftimage: 'assets/images/Event2.jpg'
    },
    {
        id: 8,
        nftaddress: '0x00we03e0rv90r90f90908f089f0',
        auctioned: false,
        nftname: 'Apple',
        owner: '0x1k289378j82j2729y27yw8y2ji9w82h8',
        nftimage: 'assets/images/Event2.jpg'
    },
    {
        id: 9,
        nftaddress: '0x00we03e0rv90r90f90908f089f0',
        auctioned: true,
        nftname: 'Tiles',
        owner: '0x1k289378j82j2729y27yw8y2ji9w82h8',
        nftimage: 'assets/images/Event2.jpg'
    },
    {
        id: 10,
        nftaddress: '0x00we03e0rv90r90f90908f089f0',
        auctioned: false,
        nftname: 'Shop',
        owner: '0x1k289378j82j2729y27yw8y2ji9w82h8',
        nftimage: 'assets/images/Event2.jpg'
    },
    {
        id: 11,
        nftaddress: '0x00we03e0rv90r90f90908f089f0',
        auctioned: true,
        nftname: 'Cartoon',
        owner: '0x1k289378j82j2729y27yw8y2ji9w82h8',
        nftimage: 'assets/images/Event2.jpg'
    },
    {
        id: 12,
        nftaddress: '0x00we03e0rv90r90f90908f089f0',
        auctioned: false,
        nftname: 'Swift',
        owner: '0x1k289378j82j2729y27yw8y2ji9w82h8',
        nftimage: 'assets/images/Event2.jpg'
    },
    {
        id: 13,
        nftaddress: '0x00we03e0rv90r90f90908f089f0',
        auctioned: true,
        nftname: 'Arch',
        owner: '0x1k289378j82j2729y27yw8y2ji9w82h8',
        nftimage: 'assets/images/Event2.jpg'
    },
    {
        id: 14,
        nftaddress: '0x00we03e0rv90r90f90908f089f0',
        auctioned: false,
        nftname: 'Pet',
        owner: '0x1k289378j82j2729y27yw8y2ji9w82h8',
        nftimage: 'assets/images/Event2.jpg'
    },
    {
        id: 15,
        nftaddress: '0x00we03e0rv90r90f90908f089f0',
        auctioned: true,
        nftname: 'Realm',
        owner: '0x1k289378j82j2729y27yw8y2ji9w82h8',
        nftimage: 'assets/images/Event2.jpg'
    },
    {
        id: 16,
        nftaddress: '0x00we03e0rv90r90f90908f089f0',
        auctioned: false,
        nftname: 'Mansion',
        owner: '0x1k289378j82j2729y27yw8y2ji9w82h8',
        nftimage: 'assets/images/Event2.jpg'
    },
    {
        id: 17,
        nftaddress: '0x00we03e0rv90r90f90908f089f0',
        auctioned: true,
        nftname: 'Cartes',
        owner: '0x1k289378j82j2729y27yw8y2ji9w82h8',
        nftimage: 'assets/images/Event2.jpg'
    }
  ])

  get() {
    return this.allTickets;
  }

async getEventManagerContract() {
    const contract = await getContract({
        address: environment.eventManagerAddress as `0x{string}`,
        abi: EventManagerABI
    })
    return contract
}

async getTicketMarketContract() {
   const contract = await getContract({
    address: environment.ticketMarketAddress as `0x{string}`,
    abi: TicketsMarketABI
   })
   return contract
}

async getEventAddress (id: number): Promise<string|undefined> {
    return (await readContract({
        address: environment.eventManagerAddress as `0x{string}`,
        // address: environment.ticketMarketAddress as `0x{string}`,
        abi: EventManagerABI,
        // abi: TicketsMarketABI,
        functionName: 'eventAt',
        args: [id]

    })) as unknown as string|undefined

}

async getTickets (nftaddress: string): Promise<string|undefined> {
    return (await readContract({
        address: environment.ticketMarketAddress as `0x{string}`,
        abi: TicketsMarketABI,
        functionName: 'createListing',
        args: [nftaddress]
    })) as unknown as string|undefined
}

async getUsersTicket() {

}

}

