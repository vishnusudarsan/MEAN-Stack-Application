var SellerContract = artifacts.require("./SellerContract.sol");

module.exports = function(deployer) {
  deployer.deploy(SellerContract);
};
