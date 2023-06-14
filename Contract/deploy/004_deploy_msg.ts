import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';
import {parseEther} from 'ethers/lib/utils';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
	const {ethers, deployments, getNamedAccounts} = hre;
	const {deploy} = deployments;

	const {deployer, simpleERC20Beneficiary: buyer} = await getNamedAccounts();

	// await deploy('Messengar', {
	// 	from: deployer,
	// 	args: [
	// 		// '0x779877A7B0D9E8603169DdbD7836e478b4624789',
	// 		// '0xab18414CD93297B0d12ac29E63Ca20f515b3DB46', //wrapper
	// 	],
	// 	log: true,
	// 	autoMine: true, // speed up deployment on local network (ganache, hardhat), no effect on live networks
	// });

	// const ct = await ethers.getContract('Messengar');

	// console.log('msg: ', await ct.readMessage());
};
export default func;
func.tags = ['msg'];
func.dependencies = [];
