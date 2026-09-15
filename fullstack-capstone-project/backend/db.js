const { MongoClient } = require('mongodb');
require('dotenv').config();

const url = process.env.MONGO_URL || 'mongodb://localhost:27017';
const dbName = process.env.MONGO_DB_NAME || 'giftDB';

const client = new MongoClient(url);
let dbInstance = null;

async function connectToDatabase() {
  if (dbInstance) {
    return dbInstance;
  }
  await client.connect();
  dbInstance = client.db(dbName);
  return dbInstance;
}

module.exports = connectToDatabase;
