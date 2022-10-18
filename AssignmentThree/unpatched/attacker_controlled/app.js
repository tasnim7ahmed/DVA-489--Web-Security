const express = require("express");
const path = require("path");
const app = express();

const mustacheExpress = require("mustache-express");

app.engine("mustache", mustacheExpress());

app.set("view engine", "mustache");
app.set("views", __dirname + "/views");

app.set("view options", { layout: false });
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: false }));

const Routes = require("./routes");

app.use(Routes);

module.exports = app;