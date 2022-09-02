const fs = require("fs");
const http = require('http');
const querystring = require("querystring");


const getIndex = (req, res) => {
    console.log("In attackPage");
    res.render("attackPageView");
};

const postAttack = () => {

  console.log("I am here!")
  var data = querystring.stringify({
    squeak: "myname",
});

var options = {
    host: 'localhost',
    port: 8000,
    path: '/home',
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(data)
    }
};

var req = http.request(options, function(res)
{
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
        console.log("body: " + chunk);
    });
});
req.write(data);
req.end();
};

module.exports = {
    getIndex,
    postAttack
};