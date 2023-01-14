const fs = require("fs");
const uuid = require("uuid");

const {
  findAllUsers,
  findAllSessions,
  findAllSqueaks,
  addUser,
  addSession,
  addSqueak,
  deleteSession,
} = require("./mongo");

const SESSION_IDS = {};

const postSignIn = (req, res) => {
  console.log("In postSignin");
  console.log(req.body);
  const { username, password } = req.body;

  findAllUsers().then((credentials) => {
    let flag = false;
    for (let credential in credentials) {
      data = credentials[credential];
      if (data["username"] == username && data["password"] == password) {
        flag = true;
        break;
      }
    }

    if (flag) {
      const sessionID = uuid.v1();

      squeak_session =
        '{"sessionid":"' + sessionID + '","username":"' + username + '"}';
      squeak_session = JSON.parse(squeak_session);

      console.log(JSON.stringify(squeak_session));

      res.cookie("squeak_session", squeak_session, {
        secure: true,
        httpOnly: true,
      });
      console.log("cookie created successfully");
      addSession(sessionID, username);

      res.redirect("/home");
    } else {
      res.redirect("/");
    }
  });
};

const postSignUp = (req, res) => {
  const { username, password, signupusername, signuppassword } = req.body;

  findAllUsers().then((credentials) => {
    let flag = false;
    let cnt = 1;
    for (let credential in credentials) {
      cnt += 1;
      data = credentials[credential];
      console.log(data);
      if (data["username"] == signupusername) {
        flag = true;
        break;
      }
    }
    if (signuppassword.length < 8 || signupusername.length < 4) {
      flag = true;
    }
    if (checkRegex(signupusername) && checkRegex(signuppassword)) {
      if (signuppassword.search(signupusername) != -1) {
        flag = true;
      }
    } else {
      flag = true;
    }

    if (flag) {
      console.log("Either Username or Password is invalid!");
    } else {
      addUser(signupusername, signuppassword);
      console.log("Account successfully created!");
    }
  });
  res.redirect("/");
};

const checkChar = (text, c) => {
  for (i = 0; i < text.length; i++) {
    if (text[i] == c) {
      return true;
    }
    return false;
  }
};

const checkRegex = (text) => {
  if (
    checkChar(text, "^") ||
    checkChar(text, "+") ||
    checkChar(text, "$") ||
    checkChar(text, "*") ||
    checkChar(text, "[") ||
    checkChar(text, "]")
  ) {
    return false;
  }
  return true;
};

const getIndex = (req, res) => {
  console.log("In getIndex");
  var cookie = req.cookies.squeak_session;
  let sessionID = "1";
  if (cookie) {
    sessionID = cookie["sessionid"];
  }

  findAllSessions().then((sessions) => {
    let flag = false;
    for (let session in sessions) {
      data = sessions[session];
      console.log(data);
      if (data["sessionID"] == sessionID) {
        flag = true;
        break;
      }
    }

    if (flag) {
      console.log("Login: Valid Session Found !");
      res.redirect("/home");
    } else {
      console.log("Valid Session Not Found", cookie);
      // fs.readFile(__dirname + "/public/landingPage.html", "utf8", (err, text) => {
      //   res.send(text);
      // });
      res.render("landingPageView");
    }
  });
};

const getHome = (req, res) => {
  console.log("In getHome");
  findAllUsers().then((creds) => {
    users = [];
    keys2 = [];

    for (let i in creds) {
      keys2.push(i);
    }
    for (let i in keys2) {
      users.push(creds[keys2[i]]);
    }

    findAllSqueaks().then((squeaks) => {
      posts = [];
      keys = [];
      for (let i in squeaks) {
        keys.push(i);
      }
      keys = keys.reverse();

      for (let i in keys) {
        posts.push(squeaks[keys[i]]);
      }

      var cookie = req.cookies.squeak_session;
      var sessionID = cookie.sessionid;

      req.session = {};

      if (!req.session.csrf) {
        req.session.csrf = uuid.v4();
      }

      SESSION_IDS[sessionID] = req.session.csrf;

      console.log(req.session.csrf);
      console.log(SESSION_IDS[sessionID]);

      console.log("Here!");
      sqks = [];
      sqls = [];
      for (let i = 0; i < posts.length; i++) {
        rec = posts[i]["receiver"];
        if (rec == "@everyone") {
          sqks.push(posts[i]);
        } else if (rec == cookie.username) {
          sqls.push(posts[i]);
        }
      }

      let data = {
        currentUser: cookie.username,
        posts_sqks: sqks,
        posts_sqls: sqls,
        token: req.session.csrf,
        usernames: users,
      };
      res.render("homeView", data);
    });
  });
};

const postHome = (req, res) => {
  console.log(req.body);
  const { squeak, receiver } = req.body;
  //console.log(squeak)
  var cookie = req.cookies.squeak_session;
  var flag = false;
  console.log(req.body.csrf);
  console.log(SESSION_IDS[cookie.sessionid]);
  if (req.body.csrf == SESSION_IDS[cookie.sessionid] && req.body.csrf) {
    flag = true;
    console.log("flag true");
  }

  if (flag) {
    // this part should go inside the previous if

    let options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    };
    let prnDt = new Date().toLocaleTimeString("en-us", options);

    addSqueak(cookie.username, squeak, receiver, prnDt).then(() => {
      res.redirect("/home");
    });
  }
};

const getSignOut = (req, res) => {
  console.log("In getSignout");
  const sessionID = req.cookies.squeak_session["sessionid"];

  console.log(sessionID + ": Removed");

  res.clearCookie("squeak_session");
  deleteSession(sessionID).then(() => {
    console.log("Signing Out");

    res.redirect("/");
  });
};

module.exports = {
  postSignIn,
  getIndex,
  getHome,
  postHome,
  postSignUp,
  getSignOut,
};
