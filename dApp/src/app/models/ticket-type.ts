export interface TicketType {
    id?: number;
    eventId: number;
    name?: string;    
    logo?: string;
    ticketsSold?: number;
    maxTickets?: number;
    ticketPrices?: any;    
    nftAttributes?: any;
    exist?: boolean;
    nftAddress: string;
    requiresNFT: boolean;
}

