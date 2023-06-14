export class Events {
    id?: number;
    name?: string;
    desc?: string;
    eventType?: string;
    orgName?: string;
    logo?: string;
    email?: string;
    date?: Date;
    website?: string;
    ticketsSold?: number;
    maxCapacity?: number;
    owner?: string;
    
    address?: string;
    nftName?: string;
    nftSymbol?: string;
}

export class PreviousEvent {
    id?: number;
    name?: string;
    logo?: string;
    date?: string;
    orgName?: string;
    timeposted?: string;
}
