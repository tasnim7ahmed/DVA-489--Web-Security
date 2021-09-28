const http = require("http");
const fs = require("fs");
const path = require("path");
const url = require("url");

let mimeTypes = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
};
let content = undefined;
let contentType = undefined;

const sendResponse = (res) => {
  res.writeHead(200, { "Content-Type": contentType });
  res.write(content);
  res.end();
};

const errorCheck = () => {
  console.log("HERE!");
};

const escaping = (params) => {
  let new_params = params;
  new_params = new_params.replace("<", "&lt");
  new_params = new_params.replace(">", "&gt");
  new_params = new_params.replace("&", "&amp");
  new_params = new_params.replace('"', "&quot");
  new_params = new_params.replace("'", "&#x27");
  return new_params;
};

const server = http.createServer((req, res) => {
  let flag = false;
  let extname = String(path.extname(req.url)).toLowerCase();
  let reqURL = url.parse(req.url, true);
  let PathName = decodeURIComponent(reqURL.pathname);

  if (extname == ".js" || extname == ".css" || extname == ".html") {
    flag = true;
    filePath = "public/" + req.url;
    try {
      content = fs.readFileSync(filePath, { encoding: "utf-8" });
      contentType = mimeTypes[extname];
    } catch (error) {
      content = "<H1>Error 404!</H1>";
      contentType = "text/html";
    }

    sendResponse(res);
  }

  if (PathName == "/") {
    flag = true;
    if (req.method == "POST") {
      let data = "";
      req.on("data", (chunk) => {
        data += chunk;
      });
      req.on("end", () => {
        console.log(data);
      });
    }
    content = fs.readFileSync("public/index.html", { encoding: "utf-8" });
    contentType = "text/html";
    sendResponse(res);
  }

  if (PathName == "/information") {
    flag = true;
    let params = reqURL.query;

    content = fs.readFileSync("templates/information.html", {
      encoding: "utf-8",
    });
    let queries = "";
    Object.keys(params).forEach((item) => {
      queries +=
        "<li>" + escaping(item) + ": " + escaping(params[item]) + "</li>";
    });
    content = content.replace("{{method}}", req.method);
    content = content.replace("{{path}}", PathName);
    content = content.replace("{{query}}", reqURL.search);
    content = content.replace("{{queries}}", queries);

    contentType = "text/html";
    sendResponse(res);
  }
  if (flag == false) {
    content = "<H1>Error 404!</H1>";
    contentType = "text/html";
    sendResponse(res);
  }
  res.end();
});

server.listen(8000);
