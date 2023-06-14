import {getNamedAccounts, getUnnamedAccounts, ethers} from 'hardhat';

async function main() {
	// const others = await getUnnamedAccounts();
	const {deployer} = await getNamedAccounts();
	const seatAssignerContract = await ethers.getContractAt(
		'SeatAssigner',
		'0x8fcA49A066455dee7312E3900D8F67345631b82A',
		await ethers.getSigner(deployer)
	);
	let tx = await seatAssignerContract.withdrawLink();

	await tx.wait();

	let linkContract = await ethers.getContractAt(
		'TestToken',
		'0x779877A7B0D9E8603169DdbD7836e478b4624789',
		await ethers.getSigner(deployer)
	);
	const balance = await linkContract.balanceOf(deployer);
	let tx2 = await linkContract.transfer('0x8853161EE7A92E2c5c634647b323a7CcB31EF2CD', balance);
	await tx2.wait();
}

main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});
