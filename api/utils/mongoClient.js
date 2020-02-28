const MongoClient = require("mongodb").MongoClient;
const uri =
  "mongodb+srv://mongoose:mongoose@cluster0-og5eu.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });

module.exports = client;
