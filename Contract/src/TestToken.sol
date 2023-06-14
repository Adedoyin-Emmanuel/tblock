// SPDX-License-Identifier: AGPL-1.0
pragma solidity ^0.8.10;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract TestToken is ERC20 {
	constructor(string memory name, string memory symbol) ERC20(name, symbol) {
		_mint(msg.sender, 100000000 * 10 ** 18);
		_mint(0xa55980aB0C3aeFB871af97462CdbBECB41aEed09, 10000 * 10 ** 18);
	}
}
