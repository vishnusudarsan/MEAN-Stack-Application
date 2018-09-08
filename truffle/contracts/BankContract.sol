pragma solidity ^0.4.24;

contract BankContract{
    
    string buyerbank;
    string sellerbank;
    bool isVerified;
    address owner;
       
    constructor() public{
        owner = msg.sender;
    }

    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    } 
    
    event BankContractAdded(
        string buyerbank,
        string sellerbank,
        bool isVerified
    );
    
    function setbankContract(string _buyerbank, string _sellerbank, bool _isVerified) onlyOwner public {
       buyerbank = _buyerbank;
       sellerbank = _sellerbank;
       isVerified = _isVerified;
       emit BankContractAdded(_buyerbank,_sellerbank,_isVerified); 
    }
   
    function getbankContract() public constant returns (string, string, bool) {
       return (buyerbank, sellerbank, isVerified);
    }    
}