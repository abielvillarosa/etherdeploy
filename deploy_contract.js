const ethers = require('ethers');
require('dotenv').config();

let contractInfo = require('./build/contracts/Swop.json');
let bytecode = contractInfo.code;
let ABI = contractInfo.abiDefinition;
// console.log(contractInfo);

let provider = ethers.getDefaultProvider('ropsten');
// console.log(provider);
// console.log(process.env.pk);

let wallet = new ethers.Wallet(process.env.pk, provider);
// console.log(wallet);

//Deploy contract
let ContractFactory = new ethers.ContractFactory(ABI, bytecode, wallet);

async function deployContract() {
    let contract = await ContractFactory.deploy();
    await contract.deployed();
    console.log(contract);
}

deployContract();