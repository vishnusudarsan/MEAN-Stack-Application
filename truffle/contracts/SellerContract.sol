pragma solidity ^0.4.24;

contract SellerContract{
    
    string buyer;
    string seller;
    bool isConfirmed;
    address owner;
       
    constructor() public{
        owner = msg.sender;
    }

    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    } 
    
    event SellerContractAdded(
        string buyer,
        string seller,
        bool isConfirmed
    );
    
    function setSellerContract(string _buyer, string _seller, bool _isConfirmed) onlyOwner public {
       buyer = _buyer;
       seller = _seller;
       isConfirmed = _isConfirmed;
       emit SellerContractAdded(_buyer,_seller,_isConfirmed); 
    }
   
    function getSellerContract() public constant returns (string, string, bool) {
       return (buyer, seller, isConfirmed);
    }    
}