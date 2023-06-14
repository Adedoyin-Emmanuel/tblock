// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;
// pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "base64-sol/base64.sol";
// import {ITicketMarket} from "./TicketMarket.sol";
import {Types} from "./Libraries/Types.sol";
import {Errors} from "./Libraries/Errors.sol";
import {IEventManager} from "./EventManager.sol";

contract Event is ERC721Enumerable, ERC721URIStorage, Ownable {
	using Counters for Counters.Counter;
	using SafeERC20 for IERC20;

	mapping(uint256 => Types.TicketCategory) public ticketCategories;

	// mapping(uint256 => Types.Ticket) public tickets;

	Types.EventStruct public eventDetails;

	// bytes32 private eventCodeHashed;

	Counters.Counter private _ticketCategoryCounter;

	uint256 private ticketCategoryCreationFee = 0;

	address payable public admin;

	Counters.Counter private _tokenCounter;

	// string _tokenUri;

	// ITicketMarket ticketMarket;

	// event Minted(address owner, uint256 tokenId);

	// modifier ticketCategoryExist(uint256 catId) {
	// 	require(ticketCategories[catId].exist, "E:CatNoExist");
	// 	_;
	// }

	modifier isNotOwnerOnly() {
		require(msg.sender != owner(), "E:IsOwner");
		_;
	}

	constructor(
		Types.EventStruct memory _eventDetails,
		string memory ticketNFTName,
		string memory ticketNFTSymbol,
		address payable _admin,
		// address _ticketMarket,
		uint256 _ticketCategoryCreationFee
	) ERC721(ticketNFTName, ticketNFTSymbol) {
		// console.log('StartiIn  1');
		ticketCategoryCreationFee = 0.0001 * 10 ** 18; // 0.0001
		eventDetails = _eventDetails;
		eventDetails.ticketsSold = 0;
		admin = _admin;
		// ticketMarket = ITicketMarket(_ticketMarket);

		ticketCategoryCreationFee = _ticketCategoryCreationFee;

		// _tokenUri = generateTokenURI(0);
		_transferOwnership(_eventDetails.owner);
	}

	// Create new ticket category
	function addTicketCategory(
		string memory name,
		string memory logo,
		uint32 maxTickets,
		Types.TicketPrice[4] memory ticketPrices,
		bool requiresNFT,
		address nftAddress,
		Types.TicketNFTRequiredAttributes[4] memory nftAttributes
	) public payable onlyOwner {
		uint256 currentTicketCategoryCounter = _ticketCategoryCounter.current();
		Types.TicketCategory storage _ticketCategory = ticketCategories[currentTicketCategoryCounter];
		// _ticketCategory.eventId = eventDetails.id;
		_ticketCategory.id = currentTicketCategoryCounter;
		_ticketCategory.ticketsSold = 0;
		_ticketCategory.name = name;
		_ticketCategory.logo = logo;
		_ticketCategory.maxTickets = maxTickets;

		for (uint t = 0; t < ticketPrices.length; t++) {
			_ticketCategory.ticketPrices[t] = ticketPrices[t];
		}

		if (requiresNFT && nftAddress == address(0)) {
			revert Errors.INVALIDNFT();
		}
		_ticketCategory.requiresNFT = requiresNFT;

		_ticketCategory.nftAddress = nftAddress;

		for (uint t = 0; t < nftAttributes.length; t++) {
			_ticketCategory.nftAttributes[t] = nftAttributes[t];
		}

		_ticketCategory.exist = true;
		//ticketCategories[currentTicketCategoryCounter] = _ticketCategory;

		_ticketCategoryCounter.increment();

		//pay admin
		if (ticketCategoryCreationFee > 0) {
			if (msg.value < ticketCategoryCreationFee) {
				revert Errors.RequiresTicketCatgeoryFee();
			}
			(bool sent, ) = admin.call{value: msg.value}("");

			if (!sent) {
				revert Errors.CurrencySendFailure();
			}
		}

		emit Types.NewTicketCategory(
			eventDetails.id,
			currentTicketCategoryCounter,
			name,
			logo,
			0,
			maxTickets,
			ticketPrices,
			requiresNFT,
			nftAddress
		);
	}

	function getTicketCategoriesCount() public view returns (uint256 count) {
		count = _ticketCategoryCounter.current();
	}

	// function getTicketCategory(uint index) public view returns (Types.TicketCategory memory ticketCategory) {
	// 	ticketCategory = ticketCategories[index];
	// }

	function buyTicket(
		uint256 _ticketCategoryId,
		uint noOfTickets,
		IERC20 saleCurrency,
		string memory metadataUrl
	) external payable /*isNotOwnerOnly*/ {
		// TODO: Check if eventDate has not been reached
		require(ticketCategories[_ticketCategoryId].exist, "E:CatNoExist");

		require(
			ticketCategories[_ticketCategoryId].ticketsSold + noOfTickets <=
				ticketCategories[_ticketCategoryId].maxTickets,
			"E:NoStock."
		);

		Types.TicketCategory storage category = ticketCategories[_ticketCategoryId];
		// NFT gating
		if (category.requiresNFT && IERC721(category.nftAddress).balanceOf(msg.sender) <= 0) {
			revert Errors.UserHasNoNFTRequired();
			// NFT attributes check will be done client side
		}

		bool foundFeeCurrency = false;

		for (uint i = 0; i < category.ticketPrices.length; i++) {
			console.log(category.ticketPrices[i].currency, ", ", address(saleCurrency));
			if (category.ticketPrices[i].currency == address(saleCurrency)) {
				foundFeeCurrency = true;
				if (category.ticketPrices[i].price > 0) {
					saleCurrency.safeTransferFrom(
						msg.sender,
						address(this),
						noOfTickets * category.ticketPrices[i].price
					);
					saleCurrency.safeTransfer(
						// address(this),
						admin,
						(noOfTickets * category.ticketPrices[i].price * 100) / 10000
					); // 1% ticket fee
				}

				break;
			}
		}

		if (!foundFeeCurrency) {
			revert Errors.WrongCurrency();
		}

		uint[] memory mintedTokens = new uint[](noOfTickets);

		for (uint n = 0; n < noOfTickets; n++) {
			// Event is a NFT
			// Ticket will be minted for each buyer

			// uint tokenId = _tokenCounter.current();
			console.log("Tkn Counter: ", _tokenCounter.current());

			_safeMint(msg.sender, _tokenCounter.current());

			_setTokenURI(_tokenCounter.current(), metadataUrl /*generateTokenURI(_ticketCategoryId)*/);

			// Types.Ticket memory _ticket = Types.Ticket(_eventId, _ticketCategoryId, tokenId);
			// tickets[tokenId] = _ticket;
			category.ticketsSold++;
			eventDetails.ticketsSold++;
			mintedTokens[n] = _tokenCounter.current();

			category.soldTickets.push(_tokenCounter.current());
			_tokenCounter.increment();
		}

		IEventManager(admin).recordTicketsale(
			msg.sender,
			eventDetails.id,
			category.ticketsSold - noOfTickets,
			category.ticketsSold
		);

		emit Types.NewTicket(eventDetails.id, _ticketCategoryId, msg.sender, mintedTokens);
	}

	function getTicketCategory(uint catId) public view returns (Types.TicketCategory memory) {
		return ticketCategories[catId];
	}

	function getLastMintedTicketTokenId() public view returns (uint256 tokenId) {
		tokenId = _tokenCounter.current();
	}

	// function listTicketOnMarketplace(uint tokenId, uint256 price) public {
	// 	ticketMarket.createListingForSeller(msg.sender, address(this), tokenId, price);
	// }

	// function isListed(uint tokenId) public view returns (bool) {
	// 	return ticketMarket.isNftListed(address(this), tokenId);
	// }

	function _beforeTokenTransfer(
		address from,
		address to,
		uint256 tokenId,
		uint256 batchSize
	) internal override(ERC721, ERC721Enumerable) {
		super._beforeTokenTransfer(from, to, tokenId, batchSize);
	}

	function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
		super._burn(tokenId);
	}

	function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
		return super.tokenURI(tokenId);
	}

	function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721Enumerable) returns (bool) {
		return super.supportsInterface(interfaceId);
	}

	/** Admin  */

	function adminWithdrawal(address currency, uint256 valueToWithdraw) public {
		require(msg.sender == admin, "ONLYADMIN");
		if (currency == address(0)) {
			(bool sent, bytes memory data) = admin.call{value: valueToWithdraw}("");
			if (!sent) revert Errors.CurrencySendFailure();
		} else {
			IERC20(currency).safeTransferFrom(address(this), admin, valueToWithdraw);
		}
	}

	// function setTicketCreationFee(uint newFee) public {
	// 	require(admin == msg.sender, "E:NOADM");
	// 	ticketCategoryCreationFee = newFee;
	// }
}
