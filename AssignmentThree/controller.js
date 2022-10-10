const fs = require("fs");
const uuid = require('uuid');


const SESSION_IDS = {};

const postSignIn = (req, res) => {
  console.log("In postSignin");
  console.log(req.body)
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

    const sessionID = uuid.v1();

    squeak_session =
      '{"sessionid":"' + sessionID + '","username":"' + username + '"}';
    squeak_session = JSON.parse(squeak_session);

    console.log(JSON.stringify(squeak_session));

    // res.cookie('squeak_session',squeak_session, { maxAge: 900000, httpOnly: true });
    // httpOnly: true will protect the cookie. this is disabled now to implement the attack

    res.cookie("squeak_session", squeak_session, {
      secure: true,
      httpOnly: true,
    });

    console.log("cookie created successfully");

    res.redirect("/home");

  } else {
    res.redirect("/");
  }
};


const postSignUp = (req, res) => {
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
  if (signuppassword.length < 8 || signupusername.length < 4) {
    flag = true;
  }
  if(checkRegex(signupusername) && checkRegex(signuppassword)){
    
    if (signuppassword.search(signupusername) != -1) {
      
      flag = true;
    }

  }
  else{
    flag = true
  }
  

  if (flag) {
    console.log("Either Username or Password is invalid!");
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
  }
  
  res.redirect("/");
};

const checkChar = (text,c) => {
  for (i=0; i<text.length; i++){
    if(text[i] == c){
      return true
    }
    return false
  }
}

const checkRegex = (text)=>{
  if (checkChar(text,'^') || checkChar(text,'+') || checkChar(text,'$') || checkChar(text,'*') || checkChar(text,'[') || checkChar(text,']')){
    return false
  }
  return true

}

const getIndex = (req, res) => {
  console.log("In getIndex");
  var cookie = req.cookies.squeak_session;


  const sessionID = req.cookies['sessionid'];
  


  if (cookie && sessionID) {
    console.log("Login: Valid Session Found !");
    res.redirect("/home");
  } else {
    console.log("Valid Session Not Found", cookie);
    // fs.readFile(__dirname + "/public/landingPage.html", "utf8", (err, text) => {
    //   res.send(text);
    // });
    res.render("landingPageView");
    
  }
};

const getHome = (req, res) => {
  console.log("In getHome");
  squeaks = fs.readFileSync("squeaks", { encoding: "utf-8" });
  squeaks = JSON.parse(String(squeaks));
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

  let data = { currentUser: cookie.username, posts: posts, token: req.session.csrf };
  //console.log(data["posts"]);
  res.render("homeView", data);

  // fs.readFile(__dirname + "/public/home.html", "utf8", (err, text) => {
  //   text = text.replace("{{currentUser}}", cookie.username);
  //   text = text.replace("{{posts}}", posts);
  //   res.send(text);
  // });
};

const postHome = (req, res) => {
  console.log(req.body)
  const { squeak } = req.body;
  //console.log(squeak)
  var cookie = req.cookies.squeak_session;
  var flag = false;
  console.log(req.body.csrf)
  console.log(SESSION_IDS[cookie.sessionid])
  if(req.body.csrf == SESSION_IDS[cookie.sessionid] && req.body.csrf)
  {
    flag = true;
    console.log("flag true")
  }

  if(flag){
  // this part should go inside the previous if
  squeaks = fs.readFileSync("squeaks", { encoding: "utf-8" });
  squeaks = JSON.parse(String(squeaks));
  keys = [];
  for (let i in squeaks) {
    keys.push(i);
  }
  keys = keys.reverse();
  post_id = parseInt(keys[0]) + 1;
  if (keys.length == 0) {
    post_id = 1;
  }
  //console.log(post_id);
  post_id = post_id.toString();
  //console.log(post_id);

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

  //console.log(prnDt);

  squeaks[post_id] = {
    username: cookie.username,
    post: squeak,
    time: prnDt,
  };

  fs.writeFileSync("squeaks", JSON.stringify(squeaks));
}
  res.redirect("/home");
};

const getSignOut = (req, res) => {
  console.log("In getSignout");
  const sessionID = req.cookies['sessionid'];

  console.log(sessionID + ': Removed');

  res.clearCookie("squeak_session");
  console.log("Signing Out");

  res.redirect("/");
};

module.exports = {
  postSignIn,
  getIndex,
  getHome,
  postHome,
  postSignUp,
  getSignOut,
};
