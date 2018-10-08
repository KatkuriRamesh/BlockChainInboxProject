const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const {interface, bytecode}=require('./compile')

const provder=new HDWalletProvider(
"drama index explain artefact urge quarter grid cement gather strike merge amount",
"https://rinkeby.infura.io/v3/2e058d8accca45b3a1d306c2e1dd7ab8"
);
const web3=new Web3(provder);

const deploy= async () =>{
  const accounts= await web3.eth.getAccounts();
  console.log('Attempting to deploy accounts from',accounts[0]);
  const result= await new web3.eth.Contract(JSON.parse(interface))
  .deploy({ data:'0x' +bytecode, arguments: ['hello world']})
  .send({ gas :'1000000', from : accounts[0] });
  console.log('contract deployed to',result.options.address);
};
deploy();
