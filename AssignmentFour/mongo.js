const mongodb = require("mongodb");

let squeaks = undefined;
let credentials = undefined;
let session = undefined;

mongodb.MongoClient.connect(process.env.DATABASE_URL)
  .then((cluster) => {
    mongoCluster = cluster;

    let db = mongoCluster.db("Squeak!");
    squeaks = db.collection("squeaks");
    credentials = db.collection("credentials");
    session = db.collection("session");
    console.log("Database connected");
    module.exports = { squeaks, credentials, session };
  })
  .catch((error) => {
    console.log(error);
  });
