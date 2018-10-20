const config = require('../config/config')
const _ = require('lodash')
const db = require('./db');
var ObjectId = require('mongodb').ObjectID

// Connecting to mongodb
const main = async () => {
  try {
    await db.connect(config.mongourl);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

main();

var service = {}

// retrieve all documents from a mongodb collection
service.getAll = () => {
  return new Promise((resolve, reject) => {
    db.collection(config.mongo.collection).find().toArray((err, users) => {
      if (err) reject(err)
      resolve(users);
    });
  });
}

// retrieve specific document from mongodb based on id
service.getById = (_id) => {
  return new Promise((resolve, reject) => {
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
}

// create document in mongodb
service.create = (userParam) => {
  return new Promise((resolve, reject) => {
    db.collection(config.mongo.collection).insert(
      userParam,
      (err, doc) => {
        if (err) reject(err)
        resolve()
      })
  })
}

// update document in mongodb based on id
service.update = (_id, userParam) => {
  return new Promise((resolve, reject) => {
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
}

// delete document in mongodb based on id
service.delete = (_id) => {
  return new Promise((resolve, reject) => {
    db.collection(config.mongo.collection).deleteOne({
        _id: ObjectId(_id)
      },
      function (err) {
        if (err) reject(err)
        resolve()
      })
  })
}

module.exports = service