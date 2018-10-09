
contract Lottery {
  address public manager;
  address[] public players;

  constructor() public{
    manager=msg.sender;
  }

  function enter() public payable{
    require(msg.value>0.1 ether);
    players.push(msg.sender);
  }


  function random() private view returns(uint){
    return  uint(keccak256(block.difficulty,now,players));
  }


  function pickWinner() public restrected{
    uint index= random() % players.length;
    players[index].transfer(this.balance);
    players=new address[](0);
  }



  function getPlayers() public view returns(address[]){
    return players;
  }

  modifier restrected(){
    require(msg.sender==manager);
    _;
  }
}
