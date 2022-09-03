const express = require('express')
const path = require('path')
const app = express()
const cookieParser = require('cookie-parser');

app.set("view options", {layout: false});
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: false }));

const Routes = require("./routes");
app.use(cookieParser());
app.use(Routes);


module.exports = app