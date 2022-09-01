const fs = require("fs");

const getIndex = (req, res) => {
    console.log("In attackPage");
    res.render("attackPageView");
};

const postAttack = (req, res) => {
    const { squeak } = req.body;
    //console.log(squeak)
    var cookie = req.cookies.squeak_session;
  
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
    console.log(post_id);
    post_id = post_id.toString();
    console.log(post_id);
  
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
  
    console.log(prnDt);
  
    squeaks[post_id] = {
      username: cookie.username,
      post: squeak,
      time: prnDt,
    };
  
    fs.writeFileSync("squeaks", JSON.stringify(squeaks));
    res.redirect("/home");
  };

module.exports = {
    getIndex,
    postAttack
};