const config = require('../config/config')
const MongoClient = require('mongodb');

let db = null;

module.exports = {
    connect: async (url) => {
            console.log('DB Connecting ...');
            if (db) return db;

            const client = await MongoClient.connect(url, {
                useNewUrlParser: true
            });
            db = client.db(config.mongo.db);
            console.log('DB Connected ...');
            return db;
        },

        collection(...rest) {
            return db.collection(...rest);
        }
};