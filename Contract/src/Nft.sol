// SPDX-License-Identifier:UNLICENSED
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Nft is Ownable, ERC721("HelloNft", "HNFT") {
	uint tokenId = 0;
	mapping(address => tokenMetaData[]) public ownershipRecord;
	struct tokenMetaData {
		uint tokenId;
		uint timeStamp;
		string tokenURI;
	}

	constructor() {
		_safeMint(msg.sender, tokenId);
		tokenId = tokenId + 1;
	}

	function mintToken(address recipient) public onlyOwner {
		// require(owner()!=recipient, "Recipient cannot be the owner of the contract");
		_safeMint(recipient, tokenId);
		ownershipRecord[recipient].push(
			tokenMetaData(tokenId, block.timestamp, "https://miro.medium.com/max/1120/1*k_EY7dcLYB5Z5k8zhMcv6g.png")
		);
		tokenId = tokenId + 1;
	}
}
