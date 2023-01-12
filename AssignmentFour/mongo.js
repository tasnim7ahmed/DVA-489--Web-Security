const mongodb = require("mongodb");

mongodb.MongoClient.connect(process.env.DATABASE_URL)
  .then((cluster) => {
    mongoCluster = cluster;

    let db = cluster.db("Squeak!");
    squeaks = db.collection("squeaks");
    credentials = db.collection("credentials");
    sessions = db.collection("sessions");
  })
  .catch((error) => {
    console.log(error);
  });
