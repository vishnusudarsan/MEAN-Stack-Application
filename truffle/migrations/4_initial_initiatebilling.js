var InitiateBilling = artifacts.require("./InitiateBilling.sol");

module.exports = function(deployer) {
  deployer.deploy(InitiateBilling);
};
