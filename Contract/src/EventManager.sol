// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/utils/Counters.sol";

import "hardhat/console.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
// import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
// import "@openzeppelin/contracts/utils/structs/EnumerableMap.sol";
import {Types} from "./Libraries/Types.sol";
import {Errors} from "./Libraries/Errors.sol";
import "./Event.sol";

interface IEventManager {
	function recordTicketsale(address eventAddress, uint eventId, uint ticketStart, uint ticketEnd) external;
}

contract EventManager is IEventManager, Ownable {
	using Counters for Counters.Counter;

	struct TicketSale {
		uint eventId;
		uint startTicket;
		uint endTicket;
	}

	// using EnumerableMap for EnumerableMap.UintToAddressMap;

	// Declare a set state variable
	// EnumerableMap.UintToAddressMap private _events;
	mapping(uint256 => address) private _events;

	Counters.Counter private _counter;

	mapping(address => uint256[]) private _ownersEvents; //owneraddress -> eventIndex

	mapping(address => TicketSale[]) private _ticketSales;

	uint256 public eventCreationFee;

	event eventCreated(address indexed owner, uint256 indexed eventID);

	// ITicketMarket public ticketMarket;

	uint256 ticketCategoryCreationFee = 0 * 10 ** 18;

	constructor() /*ITicketMarket _ticketMarket*/ {
		eventCreationFee = 0; // * 10 ** 18; // 0 for now
		// ticketMarket = _ticketMarket;
	}

	/**
	 * @dev Create A new Event.
	 */
	function createNewEvent(
		string memory ticketNFTName,
		string memory ticketNFTSymbol,
		Types.EventStruct memory eventDetails
	) public payable {
		if (eventCreationFee > 0) {
			require(msg.value >= eventCreationFee, "EM:NOFEE");
		}

		_counter.increment(); // event indexes are 1 indexed, 0 index means event does not exist

		eventDetails.owner = msg.sender;
		eventDetails.id = _counter.current();
		address payable newEventAddress = payable(
			address(
				new Event(
					eventDetails,
					ticketNFTName,
					ticketNFTSymbol,
					payable(address(this)),
					// address(ticketMarket),
					ticketCategoryCreationFee
				)
			)
		);

		_events[_counter.current()] = newEventAddress;
		// _events.set(_counter.current(), newEventAddress);
		_ownersEvents[msg.sender].push(_counter.current());
		emit eventCreated(msg.sender, _counter.current());
	}

	//offset
	function allOwnersEvents(address owner, uint256 start, uint256 offset) public view returns (uint256[] memory) {
		uint256 size = _ownersEvents[owner].length;
		if (start >= size) {
			start = 0;
		}
		if (start + offset > size) {
			offset = size - start;
		}
		uint256[] memory list = new uint256[](offset);

		for (uint256 i = start; i < start + offset; i++) {
			list[i - start] = _ownersEvents[owner][i];
		}
		return list;
	}

	function setEventCreationFee(uint newEventCreationFee) public onlyOwner {
		eventCreationFee = newEventCreationFee;
	}

	function eventsSize() public view returns (uint256 size) {
		// return _events.length();
		size = _counter.current();
	}

	// function contains(uint256 key) public view returns (bool) {
	// 	return _events.contains(key);
	// }

	function eventAt(uint256 index) public view returns (address value) {
		// return _events.at(index);
		return _events[index];
	}

	// function tryGetEventByKey(uint256 key) public view returns (bool, address) {
	// 	return _events.tryGet(key);
	// }
	function adminWithdrawal(address currency, uint256 valueToWithdraw) public onlyOwner {
		if (currency == address(0)) {
			(bool sent, bytes memory data) = msg.sender.call{value: valueToWithdraw}("");
			if (!sent) revert Errors.CurrencySendFailure();
		} else {
			IERC20(currency).transferFrom(address(this), msg.sender, valueToWithdraw);
		}
	}

	//reimplement to ensure rights of callers
	function recordTicketsale(address ownerAddress, uint eventId, uint ticketStart, uint ticketEnd) public {
		TicketSale[] storage t = _ticketSales[ownerAddress];
		TicketSale memory sale = TicketSale(eventId, ticketStart, ticketEnd);
		t.push(sale);
	}

	function getOwnedTickets(address ownerAddress) public view returns (TicketSale[] memory) {
		return _ticketSales[ownerAddress];
	}

	// function listTicketOnMarketplace(address nftAddress, uint tokenId, uint256 price) public {
	// 	//check if sender is owner of NFT
	// 	if (IERC721(nftAddress).ownerOf(tokenId) != msg.sender) {
	// 		revert Errors.NotNFTOwner();
	// 	}
	// 	ticketMarket.createListingForSeller(msg.sender, nftAddress, tokenId, price);
	// }

	// function isListed(address nftAddress, uint tokenId) public view returns (bool) {
	// 	return ticketMarket.isNftListed(nftAddress, tokenId);
	// }
}
