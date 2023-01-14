const { MongoClient } = require("mongodb");

// Connection URI
const uri = process.env.DATABASE_URL;

// Create a new MongoClient
const client = new MongoClient(uri);

async function findAllUsers() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();

    // Establish and verify connection
    db = await client.db("Squeak!");
    console.log("Connected successfully to server");
    credentials = db.collection("credentials");
    const cursor = credentials.find({});

    return await cursor.toArray();
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}

async function findAllSqueaks() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();

    // Establish and verify connection
    db = await client.db("Squeak!");
    console.log("Connected successfully to server");
    squeaks = db.collection("squeaks");
    const cursor = squeaks.find({});

    return await cursor.toArray();
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}

async function findAllSessions() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();

    // Establish and verify connection
    db = await client.db("Squeak!");
    console.log("Connected successfully to server");
    sessions = db.collection("sessions");
    const cursor = sessions.find({});

    return await cursor.toArray();
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}

async function addUser(username, password) {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();

    // Establish and verify connection
    db = await client.db("Squeak!");
    console.log("Connected successfully to server");
    credentials = db.collection("credentials");
    const doc = {
      username: username,
      password: password,
    };
    const result = await credentials.insertOne(doc);
    console.log(`A user was inserted with the _id: ${result.insertedId}`);
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}

async function addSession(sessionID, username) {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();

    // Establish and verify connection
    db = await client.db("Squeak!");
    console.log("Connected successfully to server");
    sessions = db.collection("sessions");
    const doc = {
      sessionID: sessionID,
      username: username,
    };
    const result = await sessions.insertOne(doc);
    console.log(`A session was inserted with the _id: ${result.insertedId}`);
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}

async function addSqueak(username, post, receiver, time) {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();

    // Establish and verify connection
    db = await client.db("Squeak!");
    console.log("Connected successfully to server");
    squeaks = db.collection("squeaks");
    const doc = {
      username,
      post,
      receiver,
      time,
    };
    const result = await squeaks.insertOne(doc);
    console.log(`A squeak was inserted with the _id: ${result.insertedId}`);
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}

async function deleteSession(sessionID) {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();

    // Establish and verify connection
    db = await client.db("Squeak!");
    console.log("Connected successfully to server");
    sessions = db.collection("sessions");
    const doc = {
      sessionID: sessionID,
    };
    const result = await sessions.deleteOne(doc);
    if (result.deletedCount == 1) {
      console.log("Successfully deleted one session.");
    } else {
      console.log("No sessions matched the query. Deleted 0 sessions.");
    }
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}

module.exports = {
  findAllUsers,
  findAllSessions,
  findAllSqueaks,
  addUser,
  addSession,
  addSqueak,
  deleteSession,
};
