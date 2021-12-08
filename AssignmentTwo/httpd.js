const http = require("http");
const fs = require("fs");
const path = require("path");
const url = require("url");
const querystring = require('querystring');
const cookie = require("cookie");

let mimeTypes = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  "":"text/plain"
};
let content = undefined;
let contentType = undefined;
let states = undefined;

const sendResponse = (res) => {
  res.writeHead(200, { "Content-Type": contentType });
  res.write(content);
  res.end();
};

const options = {
  key: fs.readFileSync('cert/server.key'),
  cert: fs.readFileSync('cert/server.crt')
};

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

const goHome = (res)=>{
  content = fs.readFileSync("public/index.html", { encoding: "utf-8" });
  states = fs.readFileSync('public/config.json',{encoding: "utf-8"})
  states = JSON.parse(states.toString())
  

  content = content.replace("{{/kitchen/lights/stove}}", states['/kitchen/lights/stove']);
  content = content.replace("{{/kitchen/lights/ceiling}}", states['/kitchen/lights/ceiling']);
  content = content.replace("{{/livingroom/lights/sofa}}", states['/livingroom/lights/sofa']);
  content = content.replace("{{/livingroom/lights/ceiling}}", states['/livingroom/lights/ceiling']);
  content = content.replace("{{/bedroom/lights/bed}}", states['/bedroom/lights/bed']);
  content = content.replace("{{/bedroom/lights/ceiling}}", states['/bedroom/lights/ceiling']);
  contentType = "text/html";
  sendResponse(res);
}

const server = http.createServer((req, res) => {
  let extname = String(path.extname(req.url)).toLowerCase();
  let reqURL = url.parse(req.url, true);
  let PathName = decodeURIComponent(reqURL.pathname);
  console.log(extname)
  //console.log(reqURL)
  //console.log(PathName)

  
  if (PathName == "/") {
    if(req.method=="GET"){
      goHome(res)
    }
    
  }
  else if(PathName=='/login'){
    if(req.method=='GET'){
      content = fs.readFileSync("public/login.html", { encoding: "utf-8" });
      contentType = "text/html";
      sendResponse(res);
    }

    if(req.method=='POST'){
      let data = "";
      req.on("data", (chunk) => {
        data += chunk;
      });
      req.on("end", () => {
        data = querystring.parse(data)
        let username = data['username']
        let password = data['password']
        

        credentials = fs.readFileSync('passwd',{encoding:"utf-8"})
        credentials = (JSON.parse(String(credentials)))
        
        let flag = false
        
          if(credentials[username]==password)
          {
            console.log("Login SUccessful")


            // let setCookie = cookie.serialize('athome-session',getRandomInt(100,999).toString())
            
            // console.log(setCookie)
            res.writeHead(301,{Location:'www.google.com'})
            res.end()
            flag=true
          }
        

        if(flag==false){
          console.log("Login Unsuccessful!")
        }

        // credentials = JSON.parse(credentials.toString())

        // console.log(credentials)
      });
    }
  }
  else if(PathName=='/kitchen/lights/stove'){
    
    states = fs.readFileSync('public/config.json',{encoding: "utf-8"})
    states = JSON.parse(states.toString())
    if(states['/kitchen/lights/stove']=="btn btn btn-secondary btn-sm btn-sm"){
      states['/kitchen/lights/stove'] = "btn btn btn-warning btn-sm btn-sm"
    }
    else{
      states['/kitchen/lights/stove']="btn btn btn-secondary btn-sm btn-sm"
    }
    //fs.writeFileSync('public/config.json', JSON.stringify(states))
    fs.writeFileSync('public/config.json',JSON.stringify(states))
  }
  else if(PathName=='/kitchen/lights/ceiling'){
    
    states = fs.readFileSync('public/config.json',{encoding: "utf-8"})
    states = JSON.parse(states.toString())
    if(states['/kitchen/lights/ceiling']=="btn btn btn-secondary btn-sm btn-sm"){
      states['/kitchen/lights/ceiling'] = "btn btn btn-warning btn-sm btn-sm"
    }
    else{
      states['/kitchen/lights/ceiling']="btn btn btn-secondary btn-sm btn-sm"
    }
    fs.writeFileSync('public/config.json', JSON.stringify(states))
  }

  else if(PathName=='/livingroom/lights/sofa'){
    
    states = fs.readFileSync('public/config.json',{encoding: "utf-8"})
    states = JSON.parse(states.toString())
    if(states['/livingroom/lights/sofa']=="btn btn btn-secondary btn-sm btn-sm"){
      states['/livingroom/lights/sofa'] = "btn btn btn-warning btn-sm btn-sm"
    }
    else{
      states['/livingroom/lights/sofa']="btn btn btn-secondary btn-sm btn-sm"
    }
    fs.writeFileSync('public/config.json', JSON.stringify(states))
  }
  else if(PathName=='/livingroom/lights/ceiling'){
    
    states = fs.readFileSync('public/config.json',{encoding: "utf-8"})
    states = JSON.parse(states.toString())
    if(states['/livingroom/lights/ceiling']=="btn btn btn-secondary btn-sm btn-sm"){
      states['/livingroom/lights/ceiling'] = "btn btn btn-warning btn-sm btn-sm"
    }
    else{
      states['/livingroom/lights/ceiling']="btn btn btn-secondary btn-sm btn-sm"
    }
    fs.writeFileSync('public/config.json', JSON.stringify(states))
  }

  else if(PathName=='/bedroom/lights/bed'){
    
    states = fs.readFileSync('public/config.json',{encoding: "utf-8"})
    states = JSON.parse(states.toString())
    if(states['/bedroom/lights/bed']=="btn btn btn-secondary btn-sm btn-sm"){
      states['/bedroom/lights/bed'] = "btn btn btn-warning btn-sm btn-sm"
    }
    else{
      states['/bedroom/lights/bed']="btn btn btn-secondary btn-sm btn-sm"
    }
    fs.writeFileSync('public/config.json', JSON.stringify(states))
  }
  else if(PathName=='/bedroom/lights/ceiling'){
    
    states = fs.readFileSync('public/config.json',{encoding: "utf-8"})
    states = JSON.parse(states.toString())
    if(states['/bedroom/lights/ceiling']=="btn btn btn-secondary btn-sm btn-sm"){
      states['/bedroom/lights/ceiling'] = "btn btn btn-warning btn-sm btn-sm"
    }
    else{
      states['/bedroom/lights/ceiling']="btn btn btn-secondary btn-sm btn-sm"
    }
    fs.writeFileSync('public/config.json', JSON.stringify(states))
  }

  else if (extname != ".ico") {
    filePath = "public" + req.url;
    content = fs.readFileSync(filePath, { encoding: "utf-8" });
    contentType = mimeTypes[extname];
    sendResponse(res);
  }

  res.end();
});

server.listen(8000);