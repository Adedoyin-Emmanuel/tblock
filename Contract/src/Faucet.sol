// SPDX-License-Identifier: AGPL-1.0
pragma solidity ^0.8.10;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract Faucet {
	using SafeERC20 for IERC20;

	event Withdrawn(address withdrawer, uint amount);
	uint max = 100 ether;
	mapping(address => uint256) withdrawals;

	constructor() {}

	function withdraw(IERC20 currency, uint amount) public {
		address sender = msg.sender;
		require(withdrawals[sender] + amount <= max, "Max Limit will be exceeded");

		withdrawals[sender] += amount;
		currency.safeTransfer(
			// address(this),
			sender,
			amount
		);

		emit Withdrawn(msg.sender, amount);
	}
}
