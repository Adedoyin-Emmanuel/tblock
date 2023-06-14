// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

library Errors {
	error WrongCurrency();

	error INVALIDNFT();

	error RequiresTicketCatgeoryFee();

	error CurrencySendFailure();

	error UserHasNoNFTRequired();

	error NotNFTOwner();
}
