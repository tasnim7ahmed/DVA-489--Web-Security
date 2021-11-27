const http = require("http");
const fs = require("fs");
const path = require("path");
const url = require("url");

let mimeTypes = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json"
};
let content = undefined;
let contentType = undefined;
let states = undefined;

const sendResponse = (res) => {
  res.writeHead(200, { "Content-Type": contentType });
  res.write(content);
  res.end();
};

const server = http.createServer((req, res) => {
  let extname = String(path.extname(req.url)).toLowerCase();
  let reqURL = url.parse(req.url, true);
  let PathName = decodeURIComponent(reqURL.pathname);

  //console.log(reqURL)
  //console.log(PathName)

  if (extname != ".ico" && extname != "") {
    filePath = "public" + req.url;
    content = fs.readFileSync(filePath, { encoding: "utf-8" });
    contentType = mimeTypes[extname];
    sendResponse(res);
  }
  if (PathName == "/") {
    if (req.method == "POST") {
      let data = "";
      req.on("data", (chunk) => {
        data += chunk;
      });
      req.on("end", () => {
        console.log(data);
      });
    }
    if(req.method=="GET"){
      content = fs.readFileSync("public/index.html", { encoding: "utf-8" });
      states = fs.readFileSync('public/config.json',{encoding: "utf-8"})
      states = JSON.parse(states.toString())
      

      content = content.replace("{{kitchen_lights_stove}}", states.kitchen_lights_stove);
      content = content.replace("{{kitchen_lights_ceiling}}", states.kitchen_lights_ceiling);
      content = content.replace("{{livingroom_lights_sofa}}", states.livingroom_lights_sofa);
      content = content.replace("{{livingroom_lights_ceiling}}", states.livingroom_lights_ceiling);
      content = content.replace("{{bedroom_lights_bed}}", states.bedroom_lights_bed);
      content = content.replace("{{bedroom_lights_ceiling}}", states.bedroom_lights_ceiling);
      contentType = "text/html";
      sendResponse(res);
    }
    
  }
  if(PathName=='/kitchen_lights_stove'){
    
    states = fs.readFileSync('public/config.json',{encoding: "utf-8"})
    states = JSON.parse(states.toString())
    if(states['kitchen_lights_stove']=="btn btn btn-secondary btn-sm btn-sm"){
      states['kitchen_lights_stove'] = "btn btn btn-warning btn-sm btn-sm"
    }
    else{
      states['kitchen_lights_stove']="btn btn btn-secondary btn-sm btn-sm"
    }
    fs.writeFileSync('public/config.json', JSON.stringify(states))
  }
  if(PathName=='/kitchen_lights_ceiling'){
    
    states = fs.readFileSync('public/config.json',{encoding: "utf-8"})
    states = JSON.parse(states.toString())
    if(states['kitchen_lights_ceiling']=="btn btn btn-secondary btn-sm btn-sm"){
      states['kitchen_lights_ceiling'] = "btn btn btn-warning btn-sm btn-sm"
    }
    else{
      states['kitchen_lights_ceiling']="btn btn btn-secondary btn-sm btn-sm"
    }
    fs.writeFileSync('public/config.json', JSON.stringify(states))
  }

  if(PathName=='/livingroom_lights_sofa'){
    
    states = fs.readFileSync('public/config.json',{encoding: "utf-8"})
    states = JSON.parse(states.toString())
    if(states['livingroom_lights_sofa']=="btn btn btn-secondary btn-sm btn-sm"){
      states['livingroom_lights_sofa'] = "btn btn btn-warning btn-sm btn-sm"
    }
    else{
      states['livingroom_lights_sofa']="btn btn btn-secondary btn-sm btn-sm"
    }
    fs.writeFileSync('public/config.json', JSON.stringify(states))
  }
  if(PathName=='/livingroom_lights_ceiling'){
    
    states = fs.readFileSync('public/config.json',{encoding: "utf-8"})
    states = JSON.parse(states.toString())
    if(states['livingroom_lights_ceiling']=="btn btn btn-secondary btn-sm btn-sm"){
      states['livingroom_lights_ceiling'] = "btn btn btn-warning btn-sm btn-sm"
    }
    else{
      states['livingroom_lights_ceiling']="btn btn btn-secondary btn-sm btn-sm"
    }
    fs.writeFileSync('public/config.json', JSON.stringify(states))
  }

  if(PathName=='/bedroom_lights_bed'){
    
    states = fs.readFileSync('public/config.json',{encoding: "utf-8"})
    states = JSON.parse(states.toString())
    if(states['bedroom_lights_bed']=="btn btn btn-secondary btn-sm btn-sm"){
      states['bedroom_lights_bed'] = "btn btn btn-warning btn-sm btn-sm"
    }
    else{
      states['bedroom_lights_bed']="btn btn btn-secondary btn-sm btn-sm"
    }
    fs.writeFileSync('public/config.json', JSON.stringify(states))
  }
  if(PathName=='/bedroom_lights_ceiling'){
    
    states = fs.readFileSync('public/config.json',{encoding: "utf-8"})
    states = JSON.parse(states.toString())
    if(states['bedroom_lights_ceiling']=="btn btn btn-secondary btn-sm btn-sm"){
      states['bedroom_lights_ceiling'] = "btn btn btn-warning btn-sm btn-sm"
    }
    else{
      states['bedroom_lights_ceiling']="btn btn btn-secondary btn-sm btn-sm"
    }
    fs.writeFileSync('public/config.json', JSON.stringify(states))
  }

  res.end();
});

server.listen(8000);