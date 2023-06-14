import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getContract, readContract } from '@wagmi/core';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { parseAbi } from 'viem';
import { Events, PreviousEvent } from '../models/events';
import { formatDateToJsString, getDateFromEther } from '../utils/date';
import { Web3Service } from './web3.service';
const EventManagerABI = require( "../../assets/abis/event-manager.json");
const EventABI = require( "../../assets/abis/event.json");
const EventHelperABI = require( "../../assets/abis/event-helper.json");
const SeatAssignerABI = require( "src/assets/abis/seat-assigner.json");


@Injectable({
  providedIn: 'root'
})
export class EventsService {

  signItemDetail = <Events> {
    id: 1, 
    name: 'Burnin Party', 
    desc: "A party to celebrate", 
    orgName: "Martin",
    logo: 'assets/images/Event2.jpg',
    email: 'example@gmail.com',
    date: new Date('18/22/2023, 12,49'),
    website: 'www.mint.com',
    ticketSold: 10,
    maxCapacity: 100,
    owner: "0x8124538532899247820536634",
    collection: "Gospel"
  }

  historyEvents: Array<PreviousEvent> = ([
    {
      id: 1,
      name: "Burning Party",
      logo: 'assets/images/Event2.jpg',
      date: '18/22/2023, 12,49',
      orgName: "Martin",
      timeposted: "2 hours ago"
    },
    {
      id: 1,
      name: "Burning Party",
      logo: 'assets/images/Event2.jpg',
      date: '18/22/2023, 12,49',
      orgName: "Martin",
      timeposted: "4 hours ago"
    },
    {
      id: 1,
      name: "Burning Party",
      logo: 'assets/images/Event2.jpg',
      date: '18/22/2023, 12,49',
      orgName: "Martin",
      timeposted: "8 hours ago"
    },
    {
      id: 1,
      name: "Burning Party",
      logo: 'assets/images/Event2.jpg',
      date: '18/22/2023, 12,49',
      orgName: "Martin",
      timeposted: "12 hours ago"
    },
    {
      id: 1,
      name: "Burning Party",
      logo: 'assets/images/Event2.jpg',
      date: '18/22/2023, 12,49',
      orgName: "Martin",
      timeposted: "1 day ago"
    },
    {
      id: 1,
      name: "Burning Party",
      logo: 'assets/images/Event2.jpg',
      date: '18/22/2023, 12,49',
      orgName: "Martin",
      timeposted: "3 days ago"
    }
  ])
  constructor(private http: HttpClient, private w3s: Web3Service) { }

  get () {
    return this.signItemDetail;
  }
  getHistory () {
    return this.historyEvents;
  }

  async getEventManagerContract(){
    const contract = await getContract({
      address: environment.eventManagerAddress as `0x{string}`,
      abi: EventManagerABI
    })

    return contract
  }

  async getEventContract(address: string){
    const contract = await getContract({
      address: address as `0x{string}`,
      abi: EventABI
    })

    return contract;


  }

  async getSeatAssignerContract(){
    const contract = await getContract({
      address: environment.seatAsigner as `0x{string}`,
      abi: SeatAssignerABI
    })

    return contract;


  }




  // async getUsersTickets(){
  //   const evtMgrContract = await this.getEventManagerContract();
  //   const ticketsResult = await evtMgrContract.read.getOwnedTickets( [this.w3s.account] )
  //   /**: {
  //     eventId: number,
  //     startTicket: number,
  //     endTicket: number
  //   }[] */

  //   // [

  //   //   {1,5},
  //   //   {1,2},
  //   //   {4, 5}
  //   // ]

  //   const evt = await this.getEvent(1)
  //   evt?.address





  // }




  async getEventAddress (id: number): Promise<string|undefined> {

    return  (await readContract({
      address: environment.eventManagerAddress as `0x{string}`,
      abi: EventManagerABI,
      functionName: 'eventAt',
      args: [id]
    })) as unknown as string|undefined
  }

  

  async getEvent (id: number) {
    const add = await this.getEventAddress(id);
    if(add){
      const contract = await this.getEventContract(add)
      const det: any = await contract.read.eventDetails([]);

      console.log('Evt owner: ', await contract.read.owner([]))
      
      const event: Events = {
        id: det[0],
        name: det[1],
        desc: det[2],
        eventType: det[3]=='0'?'Physical':'Virtual',
        orgName: det[4],
        logo: det[5],
        email: det[6],
        date: getDateFromEther( det[7]),
        website: det[8],
        address: add,
        ticketsSold: parseInt( det[9]),
        maxCapacity: det[10],
        owner: det[11],
        nftName: (await contract.read.name([]) ) as unknown as string,
        nftSymbol: (await contract.read.symbol([]) ) as unknown as string

      }

      

      return event
    }
    
    return  undefined
  }

  async getTicketTypes (eventAddress: string) {
    const contract = await this.getEventContract(eventAddress)
    const seatAssignerContract = await this.getSeatAssignerContract()
    const size: any = parseInt(await contract.read.getTicketCategoriesCount([]) as unknown as string ) ;
    
    const types=[]
    for (let i = 0; i < size; i++) {
      const ttype: any =  await contract.read.getTicketCategory([i]) ;
      
      const sldTokenIds = ttype.soldTickets;
      const seatAssignment = []
      for (let index = 0; index < sldTokenIds.length; index++) {
        const tokenId = sldTokenIds[index];

        const lastRequestId = await seatAssignerContract.read.lastRequestId([])
        console.log('lastRequestId:', lastRequestId) 
        
        const seat = await seatAssignerContract.read.getSeatAssignment([eventAddress, tokenId])
        if(BigInt(seat.toString()) !== BigInt(0)){
          seatAssignment.push({
            tokenId,
            seat: ttype.name + ' #' + seat
          })
        }
        
        
      } 
      
      
      types.push({
        ...ttype,
        seatAssignments:seatAssignment
      })
    }

    console.log('Ticket Type:', types)
    
    return types
  }

  

  generateAndSubmitTicketMetadata(evt: Events, ticketTypeId: string,ticketType: string, ticketLogoUrl: string){
    
    const metadata = {
      name: `${evt.nftName} ${ticketType} Ticket`,
      image: ticketLogoUrl,
      description: evt.desc,
      // tokenId: ticketId,
      attributes: [
        {
          trait_type: 'Event',
          value: evt.id?.toString()
        },
        {
          trait_type: 'Date',
          value: evt.date?.toString()
        },

        {
          trait_type: 'Organizer',
          value: evt.orgName
        },
        {
          trait_type: 'Ticket Type',
          value: ticketTypeId?.toString()
        }
      ]


    }

    return this.http.post(`${environment.apiUrl}tickets/submit-ticket`, {
      eventId: evt.id?.toString(),
      id: formatDateToIdString(new Date()),
      chainId: this.w3s.chainId,
      metadata: JSON.stringify(metadata)
    })

  }

  async getEvents () {
    const evtMgrContract = await this.getEventManagerContract()
    const size: any = parseInt(await evtMgrContract.read.eventsSize([]) as unknown as string ) ;

    const events = await Promise.all(
      Array(size)
        .fill(undefined)
        .map(async (element, index) => {
          const result = await this.getEvent( index + 1);
          return result
          
        })
    );
    
    return  events
  }

  async getOwnersEvents () {
    const evtMgrContract = await this.getEventManagerContract()

    const allOwnersEvents: any[] = await evtMgrContract.read.allOwnersEvents([this.w3s.account, 0,20]) as unknown as [];

    console.log('allOwnersEvents:', allOwnersEvents)

    const events = await Promise.all(
      allOwnersEvents.filter(ff=>ff>0)
        .map(async (element, index) => {
          const result = await this.getEvent( element);
          return result!
          
        })
    );
    
    return  events
  }

  async getOwnedTickets () {

    const evtMgrContract = await this.getEventManagerContract()
    const address= this.w3s.account

    

    const ticketSales: {
      eventId: any,
      startTicket: any,
      endTicket: any
    }[] = (await evtMgrContract.read.getOwnedTickets([address]) ) as  any ;

    
    const tickets = []

    for (let i = 0; i < ticketSales.length; i++) {
      const s = ticketSales[i];
      const eventAdd = await this.getEventAddress(s.eventId);
      const evtContract = await this.getEventContract(eventAdd!);

      for(let n=s.startTicket; n< s.endTicket;n++){
        const tokenUri = await evtContract.read.tokenURI([n]);

        if(tokenUri){
          const metadata: {
            name: string;
            image: string;
            description: string | undefined;
            attributes: {
                trait_type: string;
                value: string | undefined;
            }[]
          } = (await firstValueFrom( this.http.get(tokenUri as unknown as string) ) ) as any
          
          
          tickets.push({
            date: Date.parse(metadata.attributes.find(ff=>ff.trait_type=='Date')?.value??''),
            organizer: metadata.attributes.find(ff=>ff.trait_type=='Organizer')?.value??'',
            ...metadata,
            eventId: s.eventId,
            tokenId: n,
            tokenUri,
            eventAddress: eventAdd
          })
            

        }
      }
      
    }


    return tickets;

  }


  async getTicket (eventId: any, ticketId: number) {

    const evtMgrContract = await this.getEventManagerContract()
    const address= this.w3s.account

    const event = await this.getEvent(eventId);

    const evtContract = await this.getEventContract(event?.address!);

    const tokenUri = await evtContract.read.tokenURI([ticketId]);

    

    if(event && tokenUri){
      const metadata: {
        name: string;
        image: string;
        description: string | undefined;
        attributes: {
            trait_type: string;
            value: string | undefined;
        }[]
      } = (await firstValueFrom( this.http.get(tokenUri as unknown as string) ) ) as any
      
      
      const ticket = {
        date: Date.parse(metadata.attributes.find(ff=>ff.trait_type=='Date')?.value??''),
        organizer: metadata.attributes.find(ff=>ff.trait_type=='Organizer')?.value??'',
        ...metadata,
        eventId: eventId,
        tokenId: ticketId,
        tokenUri,
        eventAddress: event.address,
        event
      }

      return ticket
        

    }


    return undefined;

  }

}






function formatDateToIdString(date: Date){
  
  // Hours part from the timestamp
  const hours = date.getHours();
  // Minutes part from the timestamp
  const minutes = "0" + date.getMinutes();
  // Seconds part from the timestamp
  const seconds = "0" + date.getSeconds();

  const formattedTime = `${date.getMonth()}${date.getDate()}${date.getFullYear()}${hours}${minutes.substr(-2)}${seconds.substr(-2)}`;

  return formattedTime;
}