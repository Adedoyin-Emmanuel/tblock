// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.9;

contract Messengar {
	string subject;
	string message;

	function updateMessage(string memory _subject, string memory _message) public {
		subject = _subject;
		message = _message;
	}

	function readMessage() public view returns (string memory, string memory) {
		return (subject, message);
	}
}
