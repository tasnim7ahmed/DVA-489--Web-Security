const mongodb = require("mongodb");

const addUser = async (username, password) => {
  mongodb.MongoClient.connect(process.env.DATABASE_URL).then((cluster) => {
    mongoCluster = cluster;

    let db = cluster.db("Squeak!");
    squeaks = db.collection("squeaks");
    credentials = db.collection("credentials");
    sessions = db.collection("sessions");
    credentials.insertOne({
      username: username,
      password: password,
    });
    console.log("Added to DB");
  });
};

const findAllUsers = async () => {
  mongodb.MongoClient.connect(process.env.DATABASE_URL).then((cluster) => {
    mongoCluster = cluster;

    let db = cluster.db("Squeak!");
    squeaks = db.collection("squeaks");
    credentials = db.collection("credentials");
    sessions = db.collection("sessions");
    credentials.find({}).toArray(function (err, result) {
      if (err) throw err;
      console.log(result);
      return result;
    });
  });
};

module.exports = { addUser, findAllUsers };
