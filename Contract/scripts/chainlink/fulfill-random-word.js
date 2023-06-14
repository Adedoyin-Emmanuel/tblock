const {ethers, network, run} = require('hardhat');
const {VERIFICATION_BLOCK_CONFIRMATIONS, networkConfig, developmentChains} = require('../../helper-hardhat-config');
const LINK_TOKEN_ABI = require('@chainlink/contracts/abi/v0.4/LinkToken.json');

async function main() {
	//set log level to ignore non errors
	ethers.utils.Logger.setLogLevel(ethers.utils.Logger.levels.ERROR);

	const accounts = await ethers.getSigners();
	const deployer = accounts[0];

	const wrapperContract = await ethers.getContract('VRFV2Wrapper');

	const requestId = '1';
	const wrapperAddress = wrapperContract.address;
	const randomness = [34];

	const coordinator = await ethers.getContract('VRFCoordinatorV2Mock', deployer);

	await coordinator
		// .connect(owner)
		.fulfillRandomWordsWithOverride(requestId, wrapperAddress, randomness, {
			gasLimit: 1_000_000,
		});

	console.log(`Sent Random Word back `);
}

main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
