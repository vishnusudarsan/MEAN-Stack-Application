const config = require('../config/config')
const _ = require('lodash')
const get = require('lodash/get');
const MongoClient = require('mongodb').MongoClient
var ObjectId = require('mongodb').ObjectID
const Web3 = require('web3');

const web3 = new Web3(new Web3.providers.HttpProvider(config.web3Provider))
const SellerContractMetadata = require("../truffle/build/contracts/SellerContract.json");
const BankContractMetadata = require("../truffle/build/contracts/BankContract.json");
const InitiateBillingMetadata = require("../truffle/build/contracts/InitiateBilling.json");

const sellerContract = new web3.eth.Contract(
  SellerContractMetadata.abi,
  SellerContractMetadata.networks["5777"].address,
);

const bankContract = new web3.eth.Contract(
  BankContractMetadata.abi,
  BankContractMetadata.networks["5777"].address,
);

const initiateBilling = new web3.eth.Contract(
  InitiateBillingMetadata.abi,
  InitiateBillingMetadata.networks["5777"].address,
);

// Connecting to mongodb
const connection = (closure) => {
  return MongoClient.connect(config.mongourl, (err, client) => {
    if (err) return console.log(err)
    var db = client.db(config.mongo.db)
    closure(db)
  })
}

var service = {}

// retrieve all documents from a mongodb collection
service.getAll = () => {
  return new Promise((resolve, reject) => {
    connection((db) => {
      db.collection(config.mongo.collection).find().toArray((err, users) => {
        if (err) reject(err)
        resolve(users)
      })
    })
  })
}

// retrieve specific document from mongodb based on id
service.getById = (_id) => {
  return new Promise((resolve, reject) => {
    connection((db) => {
      db.collection(config.mongo.collection).findOne({
        _id: ObjectId(_id)
      }, (err, user) => {
        if (err) reject(err)
        if (user) {
          resolve(user)
        } else {
          // user not found
          resolve()
        }
      })
    })
  })
}

// retrieve specific document from mongodb based on id
service.getByBankId = (_id) => {
  return new Promise((resolve, reject) => {
    connection((db) => {
      db.collection(config.mongo.bankCollection).findOne({
        _id: ObjectId(_id)
      }, (err, user) => {
        if (err) reject(err)
        if (user) {
          resolve(user)
        } else {
          // user not found
          resolve()
        }
      })
    })
  })
}

// retrieve specific document from mongodb based on id
service.getBill = (_id) => {
  return new Promise((resolve, reject) => {
    connection((db) => {
      db.collection(config.mongo.billoflading).findOne({
        _id: ObjectId(_id)
      }, (err, user) => {
        if (err) reject(err)
        if (user) {
          resolve(user)
        } else {
          // user not found
          resolve()
        }
      })
    })
  })
}

// create document in mongodb
service.create = async (userParam) => {
  const accounts = await web3.eth.getAccounts()

  const reciept = await sellerContract.methods.setSellerContract(userParam.buyer, userParam.seller, userParam.confirmed)
    .send({
      from: accounts[0],
      gas: 4700000
    });

  const event = get(reciept, 'events.SellerContractAdded.returnValues');
  if (!event) {
    return res.status(520).json({
      message: 'SellerContractAdded event not returned properly from SellerContract contract.',
    });
  } else {
    return new Promise((resolve, reject) => {
      connection((db) => {
        db.collection(config.mongo.collection).insert(
          userParam,
          (err, doc) => {
            if (err) reject(err)
            resolve()
          })
      })
    })
  }
}

// create document in mongodb
service.createBankContract = async (userParam) => {
  const accounts = await web3.eth.getAccounts()

  const reciept = await bankContract.methods.setbankContract(userParam.buyerbank, userParam.sellerbank, userParam.verfied)
    .send({
      from: accounts[0],
      gas: 4700000
    });

  const event = get(reciept, 'events.BankContractAdded.returnValues');
  if (!event) {
    return res.status(520).json({
      message: 'BankContractAdded event not returned properly from BankContract contract.',
    });
  } else {
    return new Promise((resolve, reject) => {
      connection((db) => {
        db.collection(config.mongo.bankCollection).insert(
          userParam,
          (err, doc) => {
            if (err) reject(err)
            resolve()
          })
      })
    })
  }
}

// create document in mongodb
service.createbilloflading = (userParam) => {
  return new Promise((resolve, reject) => {
    connection((db) => {
      db.collection(config.mongo.billoflading).insert(
        userParam,
        (err, doc) => {
          if (err) reject(err)
          resolve()
        })
    })
  })
}

// create document in mongodb
service.initiatebilling = async (userParam) => {
  const accounts = await web3.eth.getAccounts()

  const reciept = await initiateBilling.methods.setBillConfirmation(userParam.amount, userParam.initiatebill)
    .send({
      from: accounts[0],
      gas: 4700000
    });

  const event = get(reciept, 'events.setBillConfirmationReleased.returnValues');
  if (!event) {
    return res.status(520).json({
      message: 'setBillConfirmationReleased event not returned properly from InitiateBilling contract.',
    });
  } else {
    return new Promise((resolve, reject) => {
      connection((db) => {
        db.collection(config.mongo.initiateBill).insert(
          userParam,
          (err, doc) => {
            if (err) reject(err)
            resolve()
          })
      })
    })
  }
}

// update document in mongodb based on id
service.update = (_id, userParam) => {
  return new Promise((resolve, reject) => {
    connection((db) => {
      db.collection(config.mongo.collection).updateOne({
          _id: ObjectId(_id)
        }, {
          $set: userParam
        },
        (err, doc) => {
          if (err) reject(err)
          resolve()
        })
    })
  })
}

// delete document in mongodb based on id
service.delete = (_id) => {
  return new Promise((resolve, reject) => {
    connection((db) => {
      db.collection(config.mongo.collection).deleteOne({
          _id: ObjectId(_id)
        },
        function (err) {
          if (err) reject(err)
          resolve()
        })
    })
  })
}

module.exports = service