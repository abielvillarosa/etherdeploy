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
let posterwallet = new ethers.Wallet(process.env.pk2, provider);
// console.log(wallet);

//Deploy contract
// let ContractFactory = new ethers.ContractFactory(ABI, bytecode, wallet);

// async function deployContract() {
//     let contract = await ContractFactory.deploy();
//     await contract.deployed();
//     console.log(contract);
// }

// deployContract();

//Interacting with Contract
let address = "0x2Ec304726Db5BE65F46E3Bd9549b5dd4db44Ed66";
let contract = new ethers.Contract( address, ABI, wallet).connect(provider);
// console.log(contract);

let workingContract = contract.connect(posterwallet);

//Call functions
async function postBooking() {
    let tx = await workingContract.postBooking("Westjet", 20190801, 1000);
    console.log("get value: ", tx);
}
postBooking();

//Events
workingContract.on("swapBookingEvent", (poster, to) => {
    console.log("poster: ", poster);
    console.log("swopper: ", to);
})