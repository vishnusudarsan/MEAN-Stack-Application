pragma solidity ^0.4.24;

contract InitiateBilling{
    
    bool initiateBill;
    uint amount;
    address owner;
       
    constructor() public{
        owner = msg.sender;
    }

    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    } 
    
    event setBillConfirmationReleased(
        uint amount,
        bool initiateBill
    );
    
    function setBillConfirmation(uint _amount, bool _initiateBill) onlyOwner public {
       amount = _amount;
       initiateBill = _initiateBill;
       emit setBillConfirmationReleased(_amount, _initiateBill); 
    }
   
    function getBillOfLading() public constant returns (uint, bool) {
       return (amount, initiateBill);
    }
    
}