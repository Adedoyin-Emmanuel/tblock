// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

library Types {
	enum EventTypes {
		PHYSICAL,
		VIRTUAL
	}

	struct EventStruct {
		uint256 id;
		string name;
		string desc;
		EventTypes eventType;
		string orgName;
		string logo; // Url
		string email;
		uint256 date;
		string website;
		uint ticketsSold;
		uint maxCapacity;
		address owner;
	}

	// events are limited to 17 arguments, arrays count as 2
	event NewTicketCategory(
		uint256 indexed eventId,
		uint256 indexed id,
		string name,
		string logo,
		uint32 ticketsSold,
		uint32 maxTickets,
		TicketPrice[4] ticketPrices,
		bool requiresNFT,
		address nftAddress
	);

	event NewTicket(uint256 eventId, uint256 ticketCategoryId, address buyer, uint[] mintedTokens);

	struct TicketCategory {
		uint256 id;
		string name;
		uint32 ticketsSold;
		uint32 maxTickets;
		TicketPrice[4] ticketPrices;
		bool requiresNFT;
		address nftAddress;
		TicketNFTRequiredAttributes[4] nftAttributes;
		string metadataIpfsCid;
		string logo;
		bool exist;
		uint[] soldTickets;
	}

	struct TicketPrice {
		uint256 price;
		address currency;
	}

	// NFT Attributes required
	struct TicketNFTRequiredAttributes {
		string name; //traitType
		string value; // trait value
	}

	struct Ticket {
		uint256 eventId;
		uint256 ticketCategoryId;
		uint256 tokenId;
	}
}
