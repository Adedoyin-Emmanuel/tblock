// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@chainlink/contracts/src/v0.8/VRFConsumerBase.sol";
import "@chainlink/contracts/src/v0.8/ConfirmedOwner.sol";
import "@chainlink/contracts/src/v0.8/VRFV2WrapperConsumerBase.sol";
import {Types} from "./Libraries/Types.sol";
import {Errors} from "./Libraries/Errors.sol";
import "./Event.sol";
import "hardhat/console.sol";

/**
 * Request testnet LINK and ETH here: https://faucets.chain.link/
 * Find information on LINK Token Contracts and get the latest ETH and LINK faucets here: https://docs.chain.link/docs/link-token-contracts/
 */

/**
 * THIS IS AN EXAMPLE CONTRACT THAT USES HARDCODED VALUES FOR CLARITY.
 * THIS IS AN EXAMPLE CONTRACT THAT USES UN-AUDITED CODE.
 * DO NOT USE THIS CODE IN PRODUCTION.
 */

contract SeatAssigner is
	VRFV2WrapperConsumerBase,
	ConfirmedOwner // DirectFunding
{
	event RequestSent(uint256 requestId, uint32 numWords);
	event RequestFulfilled(uint256 requestId, uint256[] randomWords, uint256 payment);

	struct RequestStatus {
		uint256 paid; // amount paid in link
		bool fulfilled; // whether the request has been successfully fulfilled
		uint256[] randomWords;
		uint ticketCategoryId;
		address eventAddress;
	}
	mapping(uint256 => RequestStatus) public s_requests; /* requestId --> requestStatus */

	// past requests Id.
	uint256[] public requestIds;
	uint256 public lastRequestId;

	// Depends on the number of requested values that you want sent to the
	// fulfillRandomWords() function. Test and adjust
	// this limit based on the network that you select, the size of the request,
	// and the processing of the callback request in the fulfillRandomWords()
	// function.
	uint32 callbackGasLimit = 1500000;

	// The default is 3, but you can set this higher.
	uint16 requestConfirmations = 3;

	// For this example, retrieve 2 random values in one request.
	// Cannot exceed VRFV2Wrapper.getConfig().maxNumWords.
	uint32 numWords = 1;

	// Address LINK - hardcoded for Sepolia
	address public linkAddress = 0x779877A7B0D9E8603169DdbD7836e478b4624789;

	// address WRAPPER - hardcoded for Sepolia
	address public wrapperAddress = 0xab18414CD93297B0d12ac29E63Ca20f515b3DB46;

	bytes32 internal keyHash;
	uint256 internal fee;
	uint256 public randomResult;

	uint[] public attendeesTokenIds;
	mapping(address => mapping(uint => uint256)) public seatAssignments; // eventaddress - ticketid - seat

	constructor(
		address _linkToken,
		address _wrapperAddress
	)
		// uint256 _fee
		ConfirmedOwner(msg.sender)
		VRFV2WrapperConsumerBase(_linkToken, _wrapperAddress)
	{
		wrapperAddress = _wrapperAddress;
		linkAddress = _linkToken;
		// fee = _fee;
	}

	function setCallBackGasLimit(uint32 newLimit) public onlyOwner {
		callbackGasLimit = newLimit;
	}

	function assignSeats(
		address evtAddress,
		uint ticketCategoryId
	)
		public
		returns (
			// onlyOwner
			uint256 requestId
		)
	{
		console.log("Assgning seat start");
		// require(LINK.balanceOf(address(this)) >= fee, "Not enough LINK tokens");
		// require(msg.sender == Event(evtAddress).owner(), "NotEvtOwner");

		requestId = requestRandomness(callbackGasLimit, requestConfirmations, numWords);

		console.log("Requested");
		s_requests[requestId] = RequestStatus({
			paid: VRF_V2_WRAPPER.calculateRequestPrice(callbackGasLimit),
			randomWords: new uint256[](0),
			fulfilled: false,
			ticketCategoryId: ticketCategoryId,
			eventAddress: evtAddress
		});
		requestIds.push(requestId);
		lastRequestId = requestId;
		emit RequestSent(requestId, numWords);
		return requestId;
	}

	function fulfillRandomWords(uint256 _requestId, uint256[] memory _randomWords) internal override {
		console.log("fulfillRandomWords : ", _requestId);
		require(s_requests[_requestId].paid > 0, "request not found");
		s_requests[_requestId].fulfilled = true;
		s_requests[_requestId].randomWords = _randomWords;
		emit RequestFulfilled(_requestId, _randomWords, s_requests[_requestId].paid);

		randomResult = _randomWords[0];

		Event evt = Event(s_requests[_requestId].eventAddress);
		Types.TicketCategory memory ticketCategory = evt.getTicketCategory(s_requests[_requestId].ticketCategoryId);
		uint[] memory attendees = ticketCategory.soldTickets;
		uint256 totalAttendees = attendees.length;

		for (uint256 i = 0; i < totalAttendees; i++) {
			uint256 seatIndex = 1 + ((randomResult + i) % totalAttendees); //i indexed
			seatAssignments[s_requests[_requestId].eventAddress][attendees[i]] = seatIndex;
		}
	}

	function getSeatAssignment(address evtAddress, uint attendeeTokenId) public view returns (uint256) {
		return seatAssignments[evtAddress][attendeeTokenId];
	}

	function getRequestStatus(
		uint256 _requestId
	) public view returns (uint256 paid, bool fulfilled, uint256[] memory randomWords) {
		require(s_requests[_requestId].paid > 0, "request not found");
		RequestStatus memory request = s_requests[_requestId];
		return (request.paid, request.fulfilled, request.randomWords);
	}

	/**
	 * Allow withdraw of Link tokens from the contract
	 */
	function withdrawLink() public onlyOwner {
		LinkTokenInterface link = LinkTokenInterface(linkAddress);
		require(link.transfer(msg.sender, link.balanceOf(address(this))), "Unable to transfer");
	}
}
