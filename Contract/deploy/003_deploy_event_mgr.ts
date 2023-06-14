import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';
import {parseEther} from 'ethers/lib/utils';
import {readFileSync} from 'fs';
import {join} from 'path';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
	const {ethers, deployments, getNamedAccounts, network} = hre;
	const {deploy} = deployments;

	const {deployer, simpleERC20Beneficiary: buyer} = await getNamedAccounts();

	// const ticketMarket = await ethers.getContract('TicketMarket');

	await deploy('EventManager', {
		from: deployer,
		args: [
			/*ticketMarket.address*/
		],
		log: true,
		autoMine: true, // speed up deployment on local network (ganache, hardhat), no effect on live networks
	});

	// await deploy('EventHelper', {
	// 	from: deployer,
	// 	args: [
	// 		/*ticketMarket.address*/
	// 	],
	// 	log: true,
	// 	autoMine: true, // speed up deployment on local network (ganache, hardhat), no effect on live networks
	// });

	// await deploy('SeatAssigner', {
	// 	from: deployer,
	// 	args: [
	// 		// '0xab18414CD93297B0d12ac29E63Ca20f515b3DB46', //wrapper
	// 		// '0x779877A7B0D9E8603169DdbD7836e478b4624789',
	// 	],
	// 	log: true,
	// 	autoMine: true, // speed up deployment on local network (ganache, hardhat), no effect on live networks
	// });

	const evtMgrContract = await ethers.getContract('EventManager');

	let tx = await evtMgrContract.createNewEvent('Consensus', 'CNFT', {
		date: Math.floor(Date.parse('June 6, 2023') / 1000),
		id: 0,
		desc: 'consensus 1',
		email: 'email@email.com',
		eventType: 0,
		logo: 'https://picsum.photos/id/102/1280/960',
		maxCapacity: 20,
		name: 'Consensus 2023',
		orgName: 'Consyn',
		owner: '0x0000000000000000000000000000000000000000',
		ticketsSold: 0,
		website: 'http://website.com',
	});

	await tx.wait();

	const evtAddress = await evtMgrContract.eventAt(1);

	const evtContract = await ethers.getContractAt('Event', evtAddress);

	// const ticketPrices = [
	// 	{
	// 		currency: 'mLink',
	// 		address: '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512',
	// 	},
	// 	{
	// 		currency: 'mTick',
	// 		address: '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9',
	// 	},
	// 	{
	// 		currency: 'mUSDT',
	// 		address: '0x5FC8d32690cc91D4c39d9d3abcBD16989F875707',
	// 	},
	// 	{
	// 		currency: 'mUSDC',
	// 		address: '0xa513E6E4b8f2a923D98304ec87F64353C4D5C853',
	// 	},
	// ];

	const tokenJson = readFileSync(
		join(__dirname, '/../tokens-deployed/', (network.config.chainId?.toString() ?? '') + '_tokens.json'),
		'utf-8'
	);
	const ticketPrices: any[] = JSON.parse(tokenJson);

	//sepolia
	// const ticketPrices = [
	// 	{
	// 		currency: 'mLINK',
	// 		address: '0xE385bc8D549E77eDAE202346be496dCDBAF9126B',
	// 	},
	// 	{
	// 		currency: 'mTick',
	// 		address: '0xA322DC8E58C43DbEF22a7a75122958060f3C4247',
	// 	},
	// 	{
	// 		currency: 'mUSDT',
	// 		address: '0x0e1f0fbcFdc55ac85dC74046E312E75295a40AEB',
	// 	},
	// 	{
	// 		currency: 'mUSDC',
	// 		address: '0xa5A404e80f2ED44C27E138206A2eb25A66fbbad0',
	// 	},
	// ];

	const txCat = await evtContract.addTicketCategory(
		'VIP for Consensus',
		'https://place-hold.it/200?text=vip',
		10,
		//@ts-ignore
		ticketPrices.map((v: any, ix) => {
			console.log('c is ', v);
			return {
				price: parseEther('2.5'),
				currency: v.address, //  this.ticketPricesFormArray.controls[ix].get('currency')?.value,
			};
			// return {
			//   currency: TicketCurrencies[ix].address, //  this.ticketPricesFormArray.controls[ix].get('currency')?.value,
			//   amount: parseEther(this.ticketPricesFormArray.controls[ix].get('amount')?.value.toString())
			// }
		}),
		false,
		'0x0000000000000000000000000000000000000000',
		[
			{name: '', value: ''},
			{name: '', value: ''},
			{name: '', value: ''},
			{name: '', value: ''},
		]
	);

	await txCat.wait();

	console.log('buyer is ', buyer);

	const evtBuyerContract = await (
		await ethers.getContractAt('Event', evtAddress)
	).connect(await ethers.getSigner(buyer));

	console.log('about to approve');

	const tokenContract = await ethers.getContractAt('TestToken', ticketPrices[0].address);
	let t1x = await tokenContract.transfer(buyer, ethers.utils.parseEther('200'));
	await t1x.wait();

	const buyerTokenContract = await (
		await ethers.getContractAt('TestToken', ticketPrices[0].address)
	).connect(await ethers.getSigner(buyer));

	let txAllow = await buyerTokenContract.approve(evtAddress, parseEther('1000'));
	await txAllow.wait();

	console.log('approved');

	console.log('ticketPrices is ', ticketPrices);
	try {
		let txBuyTicket = await evtBuyerContract.buyTicket(
			0,
			1,
			ticketPrices[0].address,
			'https://test-tb.heirtrust.com/tickets/metadata/31337-0-4312023115918'
		);
		await txBuyTicket.wait();
		console.log('bought');
	} catch (err) {
		console.error('Error Buying ticket: ', err);
	}
};
export default func;
func.tags = ['EventManager'];
func.dependencies = ['TicketMarket'];
