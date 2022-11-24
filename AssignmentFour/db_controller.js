const addUser = async (username, password, credentials_db) => {
  await credentials_db.insertOne({
    username: username,
    password: password,
  });
};

module.exports = { addUser };
