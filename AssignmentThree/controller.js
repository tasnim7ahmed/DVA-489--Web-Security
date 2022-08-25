const fs = require("fs");

const postSignIn = (req, res) => {
  console.log("In post");
  const { username, password } = req.body;
  credentials = fs.readFileSync("passwd", { encoding: "utf-8" });
  credentials = JSON.parse(String(credentials));
  let flag = false;
  for (let credential in credentials) {
    data = credentials[credential];
    if (data["username"] == username && data["password"] == password) {
      flag = true;
      break;
    }
  }

  if (flag) {
    sessID = Math.floor(100000 + Math.random() * 900000);
    squeak_session =
      '{"sessionid":"' + sessID + '","username":"' + username + '"}';
    squeak_session = JSON.parse(squeak_session);

    console.log(JSON.stringify(squeak_session));

    // res.cookie('squeak_session',squeak_session, { maxAge: 900000, httpOnly: true });
    // httpOnly: true will protect the cookie. this is disabled now to implement the attack

    res.cookie("squeak_session", squeak_session);

    console.log("cookie created successfully");
    res.redirect("/home");
  } else {
    res.redirect("/");
  }
};

const postSignUp = (req, res) => {
  console.log("In post");
  const { username, password, signupusername, signuppassword } = req.body;
  credentials = fs.readFileSync("passwd", { encoding: "utf-8" });
  credentials = JSON.parse(String(credentials));
  let flag = false;
  let cnt = 1;
  for (let credential in credentials) {
    cnt += 1;
    data = credentials[credential];
    if (data["username"] == signupusername) {
      flag = true;
      break;
    }
  }
  if (flag) {
    console.log("Username exists!");
  } else {
    new_cred = JSON.stringify(credentials);
    new_cred = new_cred.slice(0, new_cred.length - 1);
    new_cred +=
      ',"' +
      cnt +
      '": {"username":"' +
      signupusername +
      '", "password":"' +
      signuppassword +
      '"}}';
    new_cred = JSON.parse(new_cred);
    fs.writeFileSync("passwd", JSON.stringify(new_cred));
    console.log("Account successfully created!");
    res.redirect("/");
  }
};

const getIndex = (req, res) => {
  console.log("In getIndex");
  var cookie = req.cookies.squeak_session;
  console.log(JSON.stringify(cookie));
  if (cookie) {
    console.log("cookie exists", cookie);
    res.redirect("/home");
  } else {
    console.log("cookie DOES NOT exist", cookie);
    fs.readFile(__dirname + "/public/landingPage.html", "utf8", (err, text) => {
      res.send(text);
    });
  }
};

const getHome = (req, res) => {
  console.log("In getHome");
  squeaks = fs.readFileSync("squeaks", { encoding: "utf-8" });
  squeaks = JSON.parse(String(squeaks));
  console.log(JSON.stringify(squeaks["2"]));
  var cookie = req.cookies.squeak_session;
  console.log(cookie.username);
  fs.readFile(__dirname + "/public/home.html", "utf8", (err, text) => {
    text = text.replace("{{currentUser}}", cookie.username);
    res.send(text);
  });
};

const getSignOut = (req, res) => {
  console.log("In getSignout");

  res.clearCookie("squeak_session");
  console.log("Signing Out");

  res.redirect("/");
};

module.exports = {
  postSignIn,
  getIndex,
  getHome,
  postSignUp,
  getSignOut,
};
