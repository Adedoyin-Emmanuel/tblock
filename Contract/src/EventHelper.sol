// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "hardhat/console.sol";
// import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
// import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
// import "@openzeppelin/contracts/utils/structs/EnumerableMap.sol";
import {Types} from "./Libraries/Types.sol";
// import {Errors} from "./Libraries/Errors.sol";
import "./Event.sol";

contract EventHelper {
	function getTicketCategories(Event evt, uint catId) public view returns (Types.TicketCategory memory) {
		return evt.getTicketCategory(catId);
	}
}
