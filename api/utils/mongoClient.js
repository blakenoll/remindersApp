const MongoClient = require("mongodb").MongoClient;
const uri =
  "mongodb+srv://mongo:mongoose@cluster0-og5eu.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useUnifiedTopology: true });

module.exports = client;
