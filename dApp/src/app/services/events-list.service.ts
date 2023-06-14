import { Injectable } from '@angular/core';
import { Eventslist } from '../models/eventslist';

@Injectable({
  providedIn: 'root'
})
export class EventsListService {

  eventList: Array<Eventslist> = ([
    { 
      id: 1, 
      name: 'Burnin Party', 
      desc: "A party to celebrate", 
      orgName: "Martin",
      logo: 'assets/images/Event2.jpg',
      email: 'example@gmail.com',
      date: '18/22/2023, 12,49',
      website: 'www.mint.com',
      ticketSold: 10,
      maxCapacity: 100,
      owner: "0x8124538532899247820536634"
    },
    { id: 2, 
      name: 'Dinner Party', 
      desc: "A party to celebrate", 
      orgName: "Mark",
      logo: 'assets/images/Event2.jpg',
      email: 'jsoe@gmail.com',
      date: '18/22/2023, 12,49',
      website: 'www.mar.com',
      ticketSold: 10,
      maxCapacity: 200,
      owner: "0x6525378253733663r6353737"
    },
    { id: 3, 
      name: 'Birthday Party', 
      desc: "A party to celebrate", 
      orgName: "John",
      logo: 'assets/images/Event2.jpg',
      email: 'jsoe@gmail.com',
      date: '18/22/2023, 12,49',
      website: 'www.mar.com',
      ticketSold: 10,
      maxCapacity: 200,
      owner: "0x6525378253733663r6353737"
    },
    { id: 4, 
      name: 'Wedding Party', 
      desc: "A party to celebrate", 
      orgName: "Ceaser",
      logo: 'assets/images/Event2.jpg',
      email: 'jsoe@gmail.com',
      date: '18/22/2023, 12,49',
      website: 'www.mar.com',
      ticketSold: 30,
      maxCapacity: 150,
      owner: "0x6525378253733663r6353737"
    }
  ])

  constructor() { }

  get() {
    return this.eventList;
  }

  
}
