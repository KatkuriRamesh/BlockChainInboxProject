const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3=new Web3("ganche.provider()");
const {interface,bytecode}=require("../compile");

let lottery;
let accounts;

beforeEach(async()=>{
  accounts=await web3.eth.getAccounts();
  lottery=await new web3.eth.contract(JSON.parse(interface))
  .deploy({data:bytecode}).send({from:accounts[0],gas=1000000});
});

describe("Lottery contract",()=>{
  it("deploy a Contract",()=>{
    assert.ok(lottery.options.address);
    it("allow only one account",async()=>{
      await lottery.methods.enter().send({
        from:accuounts[0],value:web3.utils.towei('0.02','ether')
      });
      const players=await lottery.methods.getPlayers().call({
        from:accounts[0]
      });
      assert.equal(accounts[0],players[0]);
      assert.equal(1,players.length);
    })
    it("allow multiple account",async()=>{
      await lottery.methods.enter().send({
        from:accuounts[0],value:web3.utils.towei('0.02','ether');
      });
      await lottery.methods.enter().send({
        from:accuounts[1],value:web3.utils.towei('0.02','ether');
      });
      await lottery.methods.enter().send({
        from:accuounts[2],value:web3.utils.towei('0.02','ether');
      });
      const players=await lottery.methods.getPlayers().call({
        from:accounts[0]
      });
      assert.equal(accounts[0],players[0]);
      assert.equal(accounts[1],players[1]);
      assert.equal(accounts[2],players[2]);

      assert.equal(3,players.length);
    })
  });
  it('required minimum one ether',async()=>{
    try {
      await lottery.methods.enter().send({
        accuounts[0],value:0});
        assert(false);
      } catch (err) {
        assert(err);
      }
    });
    it('only manager can pick the winner',async()=>{
      try{
        await lottery.methods.().send({
          from:accounts[1]
        });
        assert(false);
      }catch(err){
        assert(err);
      }
    });
    it('send money to the winner and reset the players array',async()=>{
      await lottery.methods.enter().send({
        from:accuounts[0],value:web3.utils.towei('2','ether')
      });
      const intialBalance=await web3.eth.getBalance(accounts[0]);
      awiat lottery.methods.pickWinner().send({  from:accuounts[0] });
      const finalBalance=await web3.eth.getBalance(accounts[0]);
      const diff=intialBalance-finalBalance;
      assert(diff>web3.utils.towei('1.8','ether');

    });
  )};
